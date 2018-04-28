using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class ChangeEmailViewModel
    {
        [Required]
        public string EmailToken { get; set; }

        [Required]
        public string NewEmail { get; set; }
    }
}
