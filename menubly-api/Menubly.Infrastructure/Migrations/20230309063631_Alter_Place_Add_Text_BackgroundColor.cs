using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Alter_Place_Add_Text_BackgroundColor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundColor",
                table: "Places",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                defaultValue: "#FFFFFF");

            migrationBuilder.AddColumn<string>(
                name: "TextColor",
                table: "Places",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                defaultValue: "#000000");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundColor",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "TextColor",
                table: "Places");
        }
    }
}
