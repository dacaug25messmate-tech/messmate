using Customer.Models;
using Customer.Models.Dto;
using Customer.Repository;
using MessMate.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Customer.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerMessRepository _repository;
        private readonly UserRepository _userRepository;
        private readonly P06MessmateContext _context;

        public CustomerController(
            CustomerMessRepository repository,
            UserRepository userRepo,
            P06MessmateContext context)
        {
            _repository = repository;
            _userRepository = userRepo;
            _context = context;
        }

        // GET: api/customer
        [HttpGet]
        public IActionResult GetAllMesses()
        {
            var messes = _repository.GetAll();
            return Ok(messes);
        }

        //FIXED ROUTE CONSTRAINT
        [HttpGet("{id:int}")]
        public IActionResult GetMessById(int id)
        {
            var mess = _repository.GetMessById(id);
            if (mess == null)
                return NotFound();

            return Ok(mess);
        }

        [HttpGet("profile/{id:int}")]
        public IActionResult GetCustomerProfile(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
                return NotFound();

            var userDto = new UserDto
            {
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                Area = user.Area?.AreaName ?? "",
                City = user.Area?.City?.CityName ?? "",
                AreaId = user.AreaId,
                CityId = user.Area?.CityId ?? 0
            };

            return Ok(userDto);
        }

        [HttpGet("cities")]
        public IActionResult GetCities()
        {
            var cities = _context.Cities
                .Select(c => new { c.CityId, c.CityName })
                .ToList();

            return Ok(cities);
        }

        [HttpGet("areas/{cityId:int}")]
        public IActionResult GetAreasByCity(int cityId)
        {
            var areas = _context.Areas
                .Where(a => a.CityId == cityId)
                .Select(a => new { a.AreaId, a.AreaName })
                .ToList();

            return Ok(areas);
        }

        [HttpPut("profile/{id:int}")]
        public IActionResult UpdateCustomerProfile(int id, UpdateUserProfileDto dto)
        {
            try
            {
                bool updated = _userRepository.UpdateProfile(id, dto);
                if (!updated)
                    return NotFound("User not found");

                return Ok("Profile updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{messId:int}/daily-menu/today")]
        public IActionResult GetTodayMenuBoth(int messId)
        {
            var result = _repository.GetTodayMenuBoth(messId, DateTime.Today);

            if ((result.Lunch == null || !result.Lunch.Any()) &&
                (result.Dinner == null || !result.Dinner.Any()))
            {
                return NotFound("No menu available");
            }

            return Ok(result);
        }

        [HttpGet("{messId:int}/monthly-plans")]
        public IActionResult GetMonthlyPlans(int messId)
        {
            var plans = _repository.GetMonthlyPlans(messId);
            if (!plans.Any())
                return NotFound("No plans available");

            return Ok(plans);
        }

        [HttpPost("subscribe")]
        public IActionResult Subscribe([FromBody] SubscribeRequestDto dto)
        {
            try
            {
                var subscription = _repository.Subscribe(dto.UserId, dto.PlanId);
                return Ok(subscription);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("subscriptions/{userId:int}")]
        public IActionResult GetMySubscriptions(int userId)
        {
            var subscriptions = _repository.GetUserSubscriptions(userId);
            return Ok(subscriptions);
        }

        [HttpGet("my-subscribed/{userId:int}")]
        public IActionResult GetMySubscribedMesses(int userId)
        {
            var messes = _repository.GetSubscribedMesses(userId);
            if (!messes.Any())
                return NotFound("No subscribed messes found");

            return Ok(messes);
        }

        // RATE ENDPOINT (UNCHANGED FLOW)
        [HttpPost("rate")]
        public IActionResult RateMess([FromBody] RateMessDto dto)
        {
            try
            {
                var rating = _repository.RateMess(dto);
                return Ok(rating);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        //  FIXED ROUTE CONSTRAINT
        [HttpGet("{messId:int}/rating-summary")]
        public IActionResult GetMessRatingSummary(int messId)
        {
            var summary = _repository.GetMessRatingSummary(messId);
            return Ok(summary);
        }

        [HttpGet("subscription/{subscriptionId:int}/visit-summary")]
        public IActionResult GetVisitSummary(int subscriptionId)
        {
            try
            {
                var summary = _repository.GetVisitSummary(subscriptionId);
                return Ok(summary);
            }
            catch
            {
                return NotFound(new { message = "Visit data not found" });
            }
        }
    }
}