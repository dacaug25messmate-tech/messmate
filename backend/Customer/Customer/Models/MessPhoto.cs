using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class MessPhoto
{
    public int PhotoId { get; set; }

    public int MessId { get; set; }

    public string PhotoUrl { get; set; } = null!;

    public virtual Mess Mess { get; set; } = null!;
}
