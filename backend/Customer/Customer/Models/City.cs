using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class City
{
    public int CityId { get; set; }

    public string? CityName { get; set; }

    public virtual ICollection<Area> Areas { get; set; } = new List<Area>();
}
