namespace Menubly.Application.Contracts.Dto
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public Guid PlaceId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public short Position { get; set; }
        public IEnumerable<MenuItemDto> MenuItems { get; set; }
    }
}
