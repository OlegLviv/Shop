using System.ComponentModel.DataAnnotations;

namespace Core.Models.DTO.User
{
    public class EditUserPersonalDataDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
