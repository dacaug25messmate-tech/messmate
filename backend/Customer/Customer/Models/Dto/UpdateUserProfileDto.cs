namespace Customer.Models.Dto
{
    public class UpdateUserProfileDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int AreaId { get; set; }
    }
}
