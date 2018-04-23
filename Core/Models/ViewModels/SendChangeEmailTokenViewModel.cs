using System.ComponentModel.DataAnnotations;

namespace Core.Models.ViewModels
{
    public class SendChangeEmailTokenViewModel
    {
        [Required]
        public string NewEmail { get; set; }
    }
}
