namespace Customer.Models.Dto
{
    public class UserDto
    {
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string Area { get; set; } = null!;
        public string City { get; set; } = null!;

        //public List<string> Photos { get; set; } = new List<string>();

        public int AreaId { get; set; }   // for dropdown selection
        public int CityId { get; set; }
    }
}
