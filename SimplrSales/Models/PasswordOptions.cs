using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimplrSales.Models
{
    public class PasswordOptions
    {
     public int RequiredLength { get; set; }
          public int RequiredUniqueChars { get; set; }
            public Boolean RequireDigit { get; set; }
              public Boolean  RequireLowercase { get; set; }
             public Boolean   RequireNonAlphanumeric { get; set; }
            public Boolean    RequireUppercase { get; set; }
    }
}