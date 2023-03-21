using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Set_Currency_Default_USD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                table: "Places",
                type: "character varying(24)",
                maxLength: 24,
                nullable: true,
                defaultValue: "USD",
                oldClrType: typeof(string),
                oldType: "character varying(24)",
                oldMaxLength: 24,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                table: "Places",
                type: "character varying(24)",
                maxLength: 24,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(24)",
                oldMaxLength: 24,
                oldNullable: true,
                oldDefaultValue: "USD");
        }
    }
}
