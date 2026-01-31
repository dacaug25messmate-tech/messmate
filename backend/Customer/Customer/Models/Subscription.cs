using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class Subscription
{
    public int SubscriptionId { get; set; }

    public int UserId { get; set; }

    public int PlanId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<CustomerVisitLog> CustomerVisitLogs { get; set; } = new List<CustomerVisitLog>();

    public virtual MonthlyPlan Plan { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
