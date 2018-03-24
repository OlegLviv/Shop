using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models.ViewModels.ResponseViewModels
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
