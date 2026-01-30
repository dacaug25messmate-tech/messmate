using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class MealmenuFooditem
{
    public int MealmenuFooditemId { get; set; }

    public int MenuId { get; set; }

    public int FoodId { get; set; }

    public virtual FoodItem Food { get; set; } = null!;

    public virtual MealMenu Menu { get; set; } = null!;
}
