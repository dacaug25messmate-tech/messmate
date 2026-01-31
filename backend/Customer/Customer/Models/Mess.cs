using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class Mess
{
    public int UserId { get; set; }

    public int MessId { get; set; }

    public string MessName { get; set; } = null!;

    public string? MessAddress { get; set; }

    public string? MessType { get; set; }

    public TimeOnly LunchOpenTime { get; set; }

    public TimeOnly LunchCloseTime { get; set; }

    public TimeOnly DinnerOpenTime { get; set; }

    public TimeOnly DinnerCloseTime { get; set; }

    public int AreaId { get; set; }

    public virtual Area Area { get; set; } = null!;

    public virtual ICollection<FoodItemRequest> FoodItemRequests { get; set; } = new List<FoodItemRequest>();

    public virtual ICollection<MealMenu> MealMenus { get; set; } = new List<MealMenu>();

    public virtual ICollection<MonthlyPlan> MonthlyPlans { get; set; } = new List<MonthlyPlan>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual User User { get; set; } = null!;

    public virtual ICollection<MessPhoto> Photos { get; set; } = new List<MessPhoto>();

}
