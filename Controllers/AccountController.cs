using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.interfaces;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _token;
        public AccountController(DataContext context, ITokenService tokenService) : base(context)
        {
            _token = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) {

            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512(); //When we're finished with this class, it'll be disposed correctly
            var user = new AppUser{
                UserName = registerDto.Username.ToLower(),
                //Hashing password
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                //Generating PasswordSalt to be stored along with hashed password into DB
                PasswordSalt = hmac.Key
            };
             _context.Users.Add(user);
             await _context.SaveChangesAsync();

             return new UserDto
             {
                Username = user.UserName,
                Token = _token.CreateToken(user)
             };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //Retrieve user from Database
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if(user == null) return Unauthorized("Invalid username");

            //Using the password salt stored in DB to convert the entered user's password into hash
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            //Comparing if the hashed passwords match
            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _token.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }

}