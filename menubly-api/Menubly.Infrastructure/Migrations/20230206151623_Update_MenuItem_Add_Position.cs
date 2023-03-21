using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Update_MenuItem_Add_Position : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "MenuItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "MenuItems");
        }
    }
}
