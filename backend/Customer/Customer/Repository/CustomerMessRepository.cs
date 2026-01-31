    using Customer.Models;
using Customer.Models.Dto;
using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    namespace Customer.Repository
    {
        // Only read operations for customer
        public class CustomerMessRepository
        {
            private readonly P06MessmateContext _context;

            public CustomerMessRepository(P06MessmateContext context)
            {
                _context = context;
            }

            // Get all messes (for search/filter in frontend)
            public IEnumerable<Mess> GetAll()
            {
                return _context.Messes
                               .Include(m => m.Area)       // area/city info
                                    .ThenInclude(a => a.City)
                               .Include(m => m.Photos) // optional: for frontend images
                               .ToList();
            }

            // Get mess by ID
            public Mess GetById(int id)
            {
                return _context.Messes
                               .Include(m => m.Area)
                                       .ThenInclude(a => a.City)
                               .Include(m => m.Photos)
                               .FirstOrDefault(m => m.MessId == id);
            }

        public DailyMenuForDay GetTodayMenuBoth(int messId, DateTime date)
        {
            DateOnly menuDate = DateOnly.FromDateTime(date);

            // Fetch lunch menu items and flatten into one list
            var lunchItems = _context.MealMenus
                .Include(m => m.MealmenuFooditems)
                    .ThenInclude(mf => mf.Food)
                .Where(m => m.MessId == messId && m.MenuDate == menuDate && m.MenuType.ToUpper() == "LUNCH")
                .SelectMany(m => m.MealmenuFooditems.Select(mf => mf.Food.FoodName!))
                .Distinct() // optional: remove duplicates
                .ToList();

            // Fetch dinner menu items and flatten into one list
            var dinnerItems = _context.MealMenus
                .Include(m => m.MealmenuFooditems)
                    .ThenInclude(mf => mf.Food)
                .Where(m => m.MessId == messId && m.MenuDate == menuDate && m.MenuType.ToUpper() == "DINNER")
                .SelectMany(m => m.MealmenuFooditems.Select(mf => mf.Food.FoodName!))
                .Distinct()
                .ToList();

            return new DailyMenuForDay
            {
                Lunch = new List<DailyMenuDto> { new DailyMenuDto { MenuType = "LUNCH", Items = lunchItems } },
                Dinner = new List<DailyMenuDto> { new DailyMenuDto { MenuType = "DINNER", Items = dinnerItems } }
            };
        }


        public List<MonthlyPlanDto> GetMonthlyPlans(int messId)
        {
            return _context.MonthlyPlans
                .Where(p => p.MessId == messId)
                .Select(p => new MonthlyPlanDto
                {
                    PlanId = p.PlanId, // <-- include the actual ID
                    PlanName = p.PlanName ?? "Standard Plan",
                    Price = p.MonthlyPrice,
                    MealInclusion = p.MealInclusion,
                    ValidityPeriod = p.ValidityPeriod
                })
                .ToList();
        }


        //  Subscribe to a plan
        public Subscription Subscribe(int userId, int planId)
        {
            var plan = _context.MonthlyPlans
                .FirstOrDefault(p => p.PlanId == planId);

            if (plan == null)
                throw new Exception("Plan not found");

            // Check if user already has an active subscription for this plan
            var activeSub = _context.Subscriptions
                .FirstOrDefault(s => s.UserId == userId && s.PlanId == planId && s.Status == "Active");

            if (activeSub != null)
                throw new Exception("User already subscribed to this plan");

            var startDate = DateOnly.FromDateTime(DateTime.Today);
            var endDate = startDate.AddDays(plan.ValidityPeriod);

            var subscription = new Subscription
            {
                UserId = userId,
                PlanId = planId,
                StartDate = startDate,
                EndDate = endDate,
                Status = "Active"
            };

            _context.Subscriptions.Add(subscription);
            _context.SaveChanges();

            return subscription;
        }


        public List<SubscriptionDetailsDto> GetUserSubscriptions(int userId)
        {
            return _context.Subscriptions
                .Include(s => s.Plan)
                    .ThenInclude(p => p.Mess)
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.StartDate)
                .Select(s => new SubscriptionDetailsDto
                {
                    SubscriptionId = s.SubscriptionId,
                    MessName = s.Plan.Mess.MessName,
                    PlanName = s.Plan.PlanName,
                    MealInclusion = s.Plan.MealInclusion,
                    MonthlyPrice = s.Plan.MonthlyPrice,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    Status = s.Status
                })
                .ToList();
        }


        // Get all messes that a user is subscribed to
        public IEnumerable<SubscribedMessDto> GetSubscribedMesses(int userId)
        {
            var result = _context.Subscriptions
                .Include(s => s.Plan)
                    .ThenInclude(p => p.Mess)
                        .ThenInclude(m => m.Area)
                            .ThenInclude(a => a.City)
                .Where(s => s.UserId == userId && s.Status == "Active")
                .Select(s => new SubscribedMessDto
                {
                    SubscriptionId = s.SubscriptionId,
                    MessName = s.Plan.Mess.MessName,
                    AreaName = s.Plan.Mess.Area.AreaName,
                    CityName = s.Plan.Mess.Area.City.CityName
                })
                .ToList();

            return result;
        }



        // Add or update rating
        public Rating RateMess(RateMessDto dto)
        {
            // Check if user is subscribed to the mess
            var isSubscribed = _context.Subscriptions
                .Include(s => s.Plan)
                .Any(s => s.UserId == dto.UserId && s.Plan.MessId == dto.MessId && s.Status == "Active");

            if (!isSubscribed)
                throw new Exception("User is not subscribed to this mess");

            // Check if user has already rated this mess
            var existingRating = _context.Ratings
                .FirstOrDefault(r => r.UserId == dto.UserId && r.MessId == dto.MessId);

            if (existingRating != null)
            {
                // Update rating
                existingRating.Rating1 = dto.Rating;
                existingRating.Comments = dto.Comments;
                _context.SaveChanges();
                return existingRating;
            }

            // Add new rating
            var rating = new Rating
            {
                UserId = dto.UserId,
                MessId = dto.MessId,
                Rating1 = dto.Rating,
                Comments = dto.Comments
            };

            _context.Ratings.Add(rating);
            _context.SaveChanges();

            return rating;
        }

        public MessRatingSummaryDto GetMessRatingSummary(int messId)
        {
            var ratings = _context.Ratings
                .Where(r => r.MessId == messId);

            if (!ratings.Any())
            {
                return new MessRatingSummaryDto
                {
                    AverageRating = 0,
                    TotalRatings = 0
                };
            }

            return new MessRatingSummaryDto
            {
                AverageRating = Math.Round(ratings.Average(r => r.Rating1), 1),
                TotalRatings = ratings.Count()
            };
        }


    }
}
