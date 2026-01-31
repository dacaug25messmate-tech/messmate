using Customer.Models;
using Customer.Models.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Customer.Repository
{
    public class UserRepository
    {
        private readonly P06MessmateContext _context;

        public UserRepository(P06MessmateContext context)
        {
            _context = context;
        }

        //get customer by id
        public User GetById(int id)
        {
            return _context.Users
                .Include(u => u.Area)          // load Area
                .ThenInclude(a => a.City)      // load City
                .FirstOrDefault(u => u.Userid == id);
        }

        //edit the customer profile
        public bool UpdateProfile(int id, UpdateUserProfileDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Userid == id);
            if (user == null)
                return false;

            // Validate AreaId
            bool areaExists = _context.Areas.Any(a => a.AreaId == dto.AreaId);
            if (!areaExists)
                throw new Exception("Invalid Area selected");

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.Address = dto.Address;
            user.AreaId = dto.AreaId;   

            _context.SaveChanges();
            return true;
        }


    }
}
