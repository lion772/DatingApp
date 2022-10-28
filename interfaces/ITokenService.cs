using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
    /*The creation of an interface is option in this case, but the reason why it was created is due to:
            1)Ease of testing, to mock an interface.
            2)Best practice: it is good to have an interface available and to be able to test whenever we want.
    */
}