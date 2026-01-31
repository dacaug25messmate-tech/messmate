using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class User
{
    public int Userid { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int RoleId { get; set; }

    public int QuestionId { get; set; }

    public string QuestionAnswer { get; set; } = null!;

    public int AreaId { get; set; }

    public string? Status { get; set; }

    public virtual Area Area { get; set; } = null!;

    public virtual ICollection<Mess> Messes { get; set; } = new List<Mess>();

    public virtual SecurityQuestion Question { get; set; } = null!;

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();


}
