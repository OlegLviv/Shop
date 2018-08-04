using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Models.DomainModels.Base
{
    public class BaseEntity : IBaseEntity
    {
        [Key]
        [Required]
        [MaxLength(36, ErrorMessage = "The id must consist of 36 characters"), MinLength(36, ErrorMessage = "The id must consist of 36 characters")]
        public string Id { get; set; }

        public bool IsHiden { get; set; }

        public BaseEntity()
        {
            Id = Guid.NewGuid().ToString();
        }
    }

    public interface IBaseEntity
    {
        string Id { get; set; }
        bool IsHiden { get; set; }
    }
}
