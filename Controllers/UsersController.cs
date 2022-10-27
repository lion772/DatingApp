using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{   
    public class UsersController : BaseApiController
    {

        public UsersController(DataContext context) : base(context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() =>
          await _context.Users.ToListAsync();

        //api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)  =>
          await _context.Users.FindAsync(id);
    

    }
}