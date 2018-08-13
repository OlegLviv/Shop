using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class AdditionalPropsToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CityName",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepartAddress",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DepartNumber",
                table: "Orders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DepartAddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DepartNumber",
                table: "Orders");
        }
    }
}
