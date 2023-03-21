using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Correct_Restaurant_URL : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE public.\"Places\"\r\nSET \"Url\"='https://app.menubly.com/p/menubly-demo'\r\nWHERE public.\"Places\".\"Url\" = 'https://app.menubly.com/p/ban-kitty';");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE public.\"Places\"\r\nSET \"Url\"='https://app.menubly.com/p/ban-kitty'\r\nWHERE public.\"Places\".\"Url\" = 'https://app.menubly.com/p/menubly-demo';");
        }
    }
}
