using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Update_Category_Add_Position : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "Position",
                table: "Categories",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Position",
                table: "Categories");
        }
    }
}
