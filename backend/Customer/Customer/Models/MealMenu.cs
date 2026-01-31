using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class MealMenu
{
    public int MenuId { get; set; }

    public int MessId { get; set; }

    public DateOnly MenuDate { get; set; }

    public string MenuType { get; set; } = null!;

    public virtual ICollection<MealmenuFooditem> MealmenuFooditems { get; set; } = new List<MealmenuFooditem>();

    public virtual Mess Mess { get; set; } = null!;
}
