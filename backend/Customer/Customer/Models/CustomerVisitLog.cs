using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class CustomerVisitLog
{
    public int LogId { get; set; }

    public int SubscriptionId { get; set; }

    public DateOnly VisitDate { get; set; }

    public string VisitStatus { get; set; } = null!;

    public string MealType { get; set; } = null!;

    public virtual Subscription Subscription { get; set; } = null!;
}
