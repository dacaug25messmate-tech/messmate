using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class Area
{
    public int AreaId { get; set; }

    public string? AreaName { get; set; }

    public int CityId { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual ICollection<Mess> Messes { get; set; } = new List<Mess>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
