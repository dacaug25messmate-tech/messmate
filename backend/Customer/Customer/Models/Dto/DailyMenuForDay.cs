using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Customer.Models.Dto
{
    // DTO to return both Lunch and Dinner menus
    public class DailyMenuForDay
    {
        [JsonPropertyName("lunch")]
        public List<DailyMenuDto> Lunch { get; set; } = new List<DailyMenuDto>();

        [JsonPropertyName("dinner")]
        public List<DailyMenuDto> Dinner { get; set; } = new List<DailyMenuDto>();
    }
}
