using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class AddedIsHidden : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "SubFeedback",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "ShopingCard",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "Products",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "ProductProperties",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "ProductOrderContainer",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "ProductImage",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "PossibleProductProperties",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "Orders",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "Mailings",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "Feedback",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "CallMe",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHiden",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "SubFeedback");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "ShopingCard");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "ProductProperties");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "ProductOrderContainer");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "PossibleProductProperties");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "Mailings");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "Feedback");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "CallMe");

            migrationBuilder.DropColumn(
                name: "IsHiden",
                table: "AspNetUsers");
        }
    }
}
