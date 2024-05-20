namespace CafeBackend.Models
{
    public class Producto
    {
        public int productoId { get; set; }
        public required string nombre { get; set; }
        public required string descripcion { get; set; }
        public decimal precio { get; set; }
        public Boolean disponible { get; set; }
        public DateTime fechaCreacion { get; set; } = DateTime.Now;
        public required string imagenUrl { get; set; }

    }
}
