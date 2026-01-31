using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class Rating
{
    public int RatingId { get; set; }

    public int MessId { get; set; }

    public int UserId { get; set; }

    public int Rating1 { get; set; }

    public string? Comments { get; set; }

    public virtual Mess Mess { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
