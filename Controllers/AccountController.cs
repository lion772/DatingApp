using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        public AccountController(DataContext context) : base(context)
        {
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(string username, string password) {

            using var hmac = new HMACSHA512(); //When we're finished with this class, it'll be disposed correctly
            var user = new AppUser{
                UserName = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };
             _context.Users.Add(user);
             await _context.SaveChangesAsync();

             return user;
        }

    }
}