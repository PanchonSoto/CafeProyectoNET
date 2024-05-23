namespace CafeBackend.Models
{
    public class Producto
    {
        public int productoId { get; set; }
        public required string nombre { get; set; }
        public required string descripcion { get; set; }
        public decimal precio { get; set; }
        public Boolean disponible { get; set; } = true;
        public DateTime fechaCreacion { get; set; } = DateTime.Now;
        public required string imagenUrl { get; set; }

    }

    public class SellerProducts
    {
        public int ProductoId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public string ImagenUrl { get; set; }
        public int Ventas { get; set; }

        public decimal TotalGenerado { get; set; }

    }
}
