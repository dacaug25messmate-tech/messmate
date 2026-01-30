using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class FoodItemRequest
{
    public int RequestId { get; set; }

    public int MessId { get; set; }

    public string ItemName { get; set; } = null!;

    public string ItemDescription { get; set; } = null!;

    public string Status { get; set; } = null!;

    public int SubCategoryId { get; set; }

    public virtual Mess Mess { get; set; } = null!;

    public virtual SubCategory SubCategory { get; set; } = null!;
}
