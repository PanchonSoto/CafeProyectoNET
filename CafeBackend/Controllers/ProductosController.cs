using CafeBackend.Data;
using CafeBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CafeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly ProductosContext _context;
        private readonly IConfiguration _configuration;

        public ProductosController(ProductosContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProducto([FromBody] Producto producto)
        {
            if (producto == null)
            {
                return BadRequest();
            }

            producto.fechaCreacion = DateTime.Now;

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateProducto), new { id = producto.productoId }, producto);
        }
    

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, Producto producto)
        {
            if (id != producto.productoId)
            {
                return BadRequest(new { Message = "ID del producto no coincide." });
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return NotFound(new { Message = "Producto no encontrado." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(producto);
        }

        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCerveza(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }
            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();
            return Ok(producto);
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e=>e.productoId==id);
        }

        [HttpGet("seller-products")]
        public async Task<IActionResult> GetProductosMasVendidos()
        {
            var productos = new List<SellerProducts>();
            var connectionString = _configuration.GetConnectionString("CafeDb");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string sql = @"
                SELECT 
                    p.productoId, 
                    p.nombre, 
                    p.descripcion, 
                    p.precio, 
                    p.imagenUrl, 
                COUNT(o.productoId) AS ventas,
                SUM(o.precio) AS totalGenerado
                FROM Productos p
                INNER JOIN Ordenes o ON p.productoId = o.productoId
                GROUP BY p.productoId, p.nombre, p.descripcion, p.precio, p.imagenUrl
                ORDER BY ventas DESC";

                SqlCommand cmd = new SqlCommand(sql, conn);

                try
                {
                    await conn.OpenAsync();
                    SqlDataReader reader = await cmd.ExecuteReaderAsync();

                    while (await reader.ReadAsync())
                    {
                        productos.Add(new SellerProducts
                        {
                            ProductoId = reader.GetInt32(0),
                            Nombre = reader.GetString(1),
                            Descripcion = reader.GetString(2),
                            Precio = reader.GetDecimal(3),
                            ImagenUrl = reader.GetString(4),
                            Ventas = reader.GetInt32(5),
                            TotalGenerado = reader.GetDecimal(6),
                        });
                    }
                }
                catch (SqlException ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

            return Ok(productos);
        }
    }
}
