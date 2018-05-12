using System.ComponentModel.DataAnnotations;
using Core.Models.DomainModels.Base;

namespace Core.Models.DomainModels
{
    public class Mailing : BaseEntity
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
