using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.DomainModels
{
    public class User : IdentityUser, IBaseEntity
    {
        public string Name { get; set; }
        public string LastName { get; set; }

        public ShopingCard ShopingCard { get; set; }
    }
}
