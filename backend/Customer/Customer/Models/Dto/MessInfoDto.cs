namespace Customer.Models.Dto
{
    public class MessInfoDto
    {
        public int MessId { get; set; }
        public string MessName { get; set; } = null!;
        public string? MessAddress { get; set; }
        public string? MessType { get; set; }
        public string OwnerPhone { get; set; } = null!;   
        public string AreaName { get; set; } = null!;
        public string CityName { get; set; } = null!;
        public List<MessPhotoDto> Photos { get; set; } = new List<MessPhotoDto>();
        public string LunchOpenTime { get; set; } = null!;
        public string LunchCloseTime { get; set; } = null!;
        public string DinnerOpenTime { get; set; } = null!;
        public string DinnerCloseTime { get; set; } = null!;
    }
}
