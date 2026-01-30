using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class SubCategory
{
    public int SubCategoryId { get; set; }

    public string? SubCategoryName { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<FoodItemRequest> FoodItemRequests { get; set; } = new List<FoodItemRequest>();

    public virtual ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
}
