public class SubscribedMessDto
{
    public int SubscriptionId { get; set; }  // optional if you need uniqueness
    public string MessName { get; set; } = null!;
    public string AreaName { get; set; } = null!;
    public string CityName { get; set; } = null!;
}
