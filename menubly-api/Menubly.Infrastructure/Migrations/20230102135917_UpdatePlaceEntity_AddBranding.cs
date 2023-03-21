using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class UpdatePlaceEntity_AddBranding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Places",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Places",
                type: "character varying(24)",
                maxLength: 24,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HeaderColor",
                table: "Places",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HeaderImage",
                table: "Places",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "Places",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Places",
                type: "character varying(24)",
                maxLength: 24,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThemeColor",
                table: "Places",
                type: "character varying(16)",
                maxLength: 16,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "HeaderColor",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "HeaderImage",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "ThemeColor",
                table: "Places");
        }
    }
}
