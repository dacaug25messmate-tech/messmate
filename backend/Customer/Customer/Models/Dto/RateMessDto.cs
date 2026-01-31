namespace Customer.Models.Dto
{
    public class RateMessDto
    {
        public int UserId { get; set; }      // The user giving rating
        public int MessId { get; set; }      // The mess being rated
        public int Rating { get; set; }      // 1 to 5
        public string? Comments { get; set; } // Optional comments
    }
}
