namespace CafeBackend.Models
{
    public class OrderInsertModel
    {
        public int OrdenId { get; set; }
        public Guid UsuarioId { get; set; }
        public int ProductoId { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        public DateTime FechaOrden { get; set; }
    }

    public class OrderSelectModel
    {
        public int OrdenId { get; set; }
        public Guid UsuarioId { get; set; }
        public int ProductoId { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        public DateTime FechaOrden { get; set; }
        public string NombreProducto { get; set; }
        public string DescripcionProducto { get; set; }
    }
}
