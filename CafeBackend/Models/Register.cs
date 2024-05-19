using System.ComponentModel.DataAnnotations;

namespace CafeBackend.Models
{
    public class RegisterReq
    {
        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(100)]
        public string Apellido { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Contraseña { get; set; }
    }
}
