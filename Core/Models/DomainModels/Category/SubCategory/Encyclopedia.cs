using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category.SubCategory
{
    public class Encyclopedia : BaseEntity
    {
        public Book Book { get; set; }
        public string BookId { get; set; }
    }
}
