using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Menubly.Infrastructure.Migrations
{
    public partial class Update_User_Model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "JoinedDate",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "PersonalEmail",
                table: "UserProfiles");

            migrationBuilder.AddColumn<string>(
                name: "UserSub",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BusinessName",
                table: "UserProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BusinessUrl",
                table: "UserProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserSub",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BusinessName",
                table: "UserProfiles");

            migrationBuilder.DropColumn(
                name: "BusinessUrl",
                table: "UserProfiles");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                type: "character varying(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "UserProfiles",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "JoinedDate",
                table: "UserProfiles",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonalEmail",
                table: "UserProfiles",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);
        }
    }
}
