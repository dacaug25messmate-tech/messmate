namespace Customer.Models.Dto
{
    public class SubscriptionDetailsDto
    {
        public int SubscriptionId { get; set; }
        public string MessName { get; set; } = "";
        public string PlanName { get; set; } = "";
        public string MealInclusion { get; set; } = "";
        public decimal MonthlyPrice { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string Status { get; set; } = "";
    }
}
