using Core.Models.DomainModels.Base;
using Microsoft.AspNetCore.Identity;

namespace Core.Models.DomainModels
{
    public class User : IdentityUser, IBaseEntity
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public ShopingCard ShopingCard { get; set; }

        public bool IsSubscribedToMailing { get; set; }

        public bool IsHiden { get; set; }
    }
}
