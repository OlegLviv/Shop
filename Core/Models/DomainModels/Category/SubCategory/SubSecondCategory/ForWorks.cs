using Core.Models.DomainModels.Category.SubCategoty;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels.Category.SubCategory.SubSecondCategory
{
    public class ForWorks : BaseEntity
    {
        public SchoolFolder SchoolFolder { get; set; }
        public string SchoolFolderId { get; set; }

        //public ICollection<ExpandoObject> Items { get; set; }
    }
}
