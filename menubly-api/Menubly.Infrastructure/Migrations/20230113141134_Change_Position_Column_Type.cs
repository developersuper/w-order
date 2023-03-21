using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Change_Position_Column_Type : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Position",
                table: "Categories",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(short),
                oldType: "smallint",
                oldDefaultValue: (short)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "Position",
                table: "Categories",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldDefaultValue: 0);
        }
    }
}
