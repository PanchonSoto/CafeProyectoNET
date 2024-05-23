using CafeBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CafeBackend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrderController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInsertModel orderRequest)
        {
            var connectionString = _configuration.GetConnectionString("CafeDb");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string insertQuery = @"
                    INSERT INTO Ordenes (usuarioId, productoId, precio, cantidad, fechaOrden) 
                    VALUES (@UsuarioId, @ProductoId, @Precio, @Cantidad, @FechaOrden);
                SELECT SCOPE_IDENTITY();";

                using (SqlCommand insertCommand = new SqlCommand(insertQuery, connection))
                {
                    insertCommand.Parameters.Add(new SqlParameter("@UsuarioId", SqlDbType.UniqueIdentifier) { Value = orderRequest.UsuarioId });
                    insertCommand.Parameters.Add(new SqlParameter("@ProductoId", SqlDbType.Int) { Value = orderRequest.ProductoId });
                    insertCommand.Parameters.Add(new SqlParameter("@Precio", SqlDbType.Decimal) { Value = orderRequest.Precio });
                    insertCommand.Parameters.Add(new SqlParameter("@Cantidad", SqlDbType.Int) { Value = orderRequest.Cantidad });
                    insertCommand.Parameters.Add(new SqlParameter("@FechaOrden", SqlDbType.DateTime) { Value = DateTime.Now });

                    var orderId = Convert.ToInt32(await insertCommand.ExecuteScalarAsync());

                    string selectQuery = "SELECT ordenId, usuarioId, productoId, precio, cantidad, fechaOrden FROM Ordenes WHERE ordenId = @OrdenId";
                    using (SqlCommand selectCommand = new SqlCommand(selectQuery, connection))
                    {
                        selectCommand.Parameters.Add(new SqlParameter("@OrdenId", SqlDbType.Int) { Value = orderId });

                        using (SqlDataReader reader = await selectCommand.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                var orderResponse = new OrderInsertModel
                                {
                                    OrdenId = reader.GetInt32(0),
                                    UsuarioId = reader.GetGuid(1),
                                    ProductoId = reader.GetInt32(2),
                                    Precio = reader.GetDecimal(3),
                                    Cantidad = reader.GetInt32(4),
                                    FechaOrden = reader.GetDateTime(5)
                                };
                                return Ok(orderResponse);
                            }
                            else
                            {
                                return StatusCode(500, new { Message = "Error retrieving order after insertion" });
                            }
                        }
                    }
                }
            }
        }

        [HttpGet("user/{usuarioId}")]
        public async Task<IActionResult> GetOrdersByUserId(Guid usuarioId)
        {
            var connectionString = _configuration.GetConnectionString("CafeDb");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string query = @"
                    SELECT 
                        o.ordenId, 
                        o.usuarioId, 
                        o.productoId, 
                        o.precio, 
                        o.cantidad, 
                        o.fechaOrden,
                        p.nombre AS NombreProducto,
                        p.descripcion AS DescripcionProducto,
                        p.imagenUrl
                    FROM 
                        Ordenes o
                    LEFT JOIN 
                        Productos p ON o.productoId = p.productoId
                    WHERE 
                        o.usuarioId = @UsuarioId
                    ORDER BY 
                        o.fechaOrden DESC";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.Add(new SqlParameter("@UsuarioId", SqlDbType.UniqueIdentifier) { Value = usuarioId });

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        var orders = new List<OrderSelectModel>();

                        while (await reader.ReadAsync())
                        {
                            var order = new OrderSelectModel
                            {
                                OrdenId = reader.GetInt32(0),
                                UsuarioId = reader.GetGuid(1),
                                ProductoId = reader.GetInt32(2),
                                Precio = reader.GetDecimal(3),
                                Cantidad = reader.GetInt32(4),
                                FechaOrden = reader.GetDateTime(5),
                                NombreProducto = reader.IsDBNull(6) ? null : reader.GetString(6),
                                DescripcionProducto = reader.IsDBNull(7) ? null : reader.GetString(7),
                                ImagenUrl = reader.GetString(8),
                            };
                            orders.Add(order);
                        }

                        return Ok(orders);
                    }
                }
            }
        }
    }

}
