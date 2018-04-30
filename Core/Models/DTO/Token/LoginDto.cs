using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.Token
{
    /// <summary>
    /// ViewModel for login user
    /// </summary>
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
