namespace CafeBackend.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string rol {  get; set; }


    }
}
