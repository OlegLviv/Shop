using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Models.DomainModels
{
    public class ProductImage : BaseEntity
    {
        public string ProductId { get; set; }
        public Product Product { get; set; }
        public byte[] Image { get; set; }
    }
}
