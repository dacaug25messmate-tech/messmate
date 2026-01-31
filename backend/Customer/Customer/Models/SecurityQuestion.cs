using System;
using System.Collections.Generic;

namespace Customer.Models;

public partial class SecurityQuestion
{
    public int QuestionId { get; set; }

    public string QuestionText { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
