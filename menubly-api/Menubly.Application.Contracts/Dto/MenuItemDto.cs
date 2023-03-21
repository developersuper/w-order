namespace Menubly.Application.Contracts.Dto
{
    public class MenuItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Status { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Image { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int Position { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
