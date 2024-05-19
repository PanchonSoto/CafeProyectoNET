using System.ComponentModel.DataAnnotations;

namespace CafeBackend.Models
{
    public class LoginReq
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string contraseña { get; set; }

    }
}
