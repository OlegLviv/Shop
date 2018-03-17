using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    /// <summary>
    /// ViewModel for login user
    /// </summary>
    public class LoginViewModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
