using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class FoodItem
{
    public int FoodItemId { get; set; }

    public int SubCategoryId { get; set; }

    public string? FoodName { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<MealmenuFooditem> MealmenuFooditems { get; set; } = new List<MealmenuFooditem>();

    public virtual SubCategory SubCategory { get; set; } = null!;
}
