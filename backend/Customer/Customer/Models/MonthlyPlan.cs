using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class MonthlyPlan
{
    public int PlanId { get; set; }

    public int MessId { get; set; }

    public string? PlanName { get; set; }

    public decimal MonthlyPrice { get; set; }

    public string MealInclusion { get; set; } = null!;

    public int ValidityPeriod { get; set; }

    public virtual Mess Mess { get; set; } = null!;

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
