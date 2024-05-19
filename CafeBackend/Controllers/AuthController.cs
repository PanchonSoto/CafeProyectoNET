using CafeBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CafeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginReq loginRequest)
        {
            var connectionString = _configuration.GetConnectionString("CafeDb");

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT userId, nombre, apellido, email, rol FROM Usuarios WHERE email = @Email AND contraseña = @Contraseña";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar) { Value = loginRequest.email });
                        command.Parameters.Add(new SqlParameter("@Contraseña", SqlDbType.NVarChar) { Value = loginRequest.contraseña });

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                var userResponse = new User
                                {
                                    UserId = reader.GetGuid(0),
                                    Nombre = reader.GetString(1),
                                    Apellido = reader.GetString(2),
                                    Email = reader.GetString(3),
                                    rol = reader.GetString(4)
                                };
                                return Ok(userResponse);
                            }
                            else
                            {
                                return Unauthorized(new { Message = "Invalid email or password" });
                            }
                        }
                    }
                }

            } catch (Exception ex)
            {
                return BadRequest(new { Message = "Error" + ex });
            }

        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterReq registerRequest)
        {
            var connectionString = _configuration.GetConnectionString("CafeDb");

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    //verificar si emaile sta en uso
                    string verifyQuery = "SELECT COUNT(*) FROM Usuarios WHERE email = @Email";
                    using (SqlCommand verifyCommand = new SqlCommand(verifyQuery, connection))
                    {
                        verifyCommand.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar) { Value = registerRequest.Email });

                        int emailCount = (int)await verifyCommand.ExecuteScalarAsync();
                        if (emailCount > 0)
                        {
                            return Conflict(new { Message = "Correo en uso." });
                        }
                    }

                    // Insertar nuevo usuario
                    string insertQuery = @"
                        INSERT INTO Usuarios (userId, nombre, apellido, email, contraseña, fechaRegistro, rol) 
                        VALUES (@UserId, @Nombre, @Apellido, @Email, @Contraseña, @FechaRegistro, @Rol)";
                    //'newGuid'
                    var newUserId = Guid.NewGuid();

                    using (SqlCommand insertCommand = new SqlCommand(insertQuery, connection))
                    {
                        insertCommand.Parameters.Add(new SqlParameter("@UserId", SqlDbType.UniqueIdentifier) { Value = newUserId });
                        insertCommand.Parameters.Add(new SqlParameter("@Nombre", SqlDbType.NVarChar) { Value = registerRequest.Nombre });
                        insertCommand.Parameters.Add(new SqlParameter("@Apellido", SqlDbType.NVarChar) { Value = registerRequest.Apellido });
                        insertCommand.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar) { Value = registerRequest.Email });
                        insertCommand.Parameters.Add(new SqlParameter("@Contraseña", SqlDbType.NVarChar) { Value = registerRequest.Contraseña });
                        insertCommand.Parameters.Add(new SqlParameter("@FechaRegistro", SqlDbType.DateTime) { Value = DateTime.Now });
                        insertCommand.Parameters.Add(new SqlParameter("@Rol", SqlDbType.NVarChar) { Value = "User" });

                        await insertCommand.ExecuteNonQueryAsync();
                    }

                    // select al user registrado tomando su 'newGuid'
                    string selectQuery = "SELECT userId, nombre, apellido, email,rol FROM Usuarios WHERE userId = @UserId";
                    using (SqlCommand selectCommand = new SqlCommand(selectQuery, connection))
                    {
                        selectCommand.Parameters.Add(new SqlParameter("@UserId", SqlDbType.UniqueIdentifier) { Value = newUserId });

                        using (SqlDataReader reader = await selectCommand.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                var userResponse = new User
                                {
                                    UserId = reader.GetGuid(0),
                                    Nombre = reader.GetString(1),
                                    Apellido = reader.GetString(2),
                                    Email = reader.GetString(3),
                                    rol = reader.GetString(4),
                                };
                                return Ok(userResponse);
                            }
                            else
                            {
                                return StatusCode(500, new { Message = "Error retrieving user after registration" });
                            }
                        }
                    }

                }

            } catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Error: "+ex });
            }

        }

    }
}
