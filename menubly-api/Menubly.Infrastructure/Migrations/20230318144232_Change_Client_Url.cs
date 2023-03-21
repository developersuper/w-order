using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Change_Client_Url : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE public.\"Places\"\r\nSET \"Url\"='https://app.menubly.com/p/hotelrollingrang'\r\nWHERE public.\"Places\".\"Url\" = 'https://app.menubly.com/p/mohit-resto';");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE public.\"Places\"\r\nSET \"Url\"='https://app.menubly.com/p/mohit-resto'\r\nWHERE public.\"Places\".\"Url\" = 'https://app.menubly.com/p/hotelrollingrang';");
        }
    }
}
