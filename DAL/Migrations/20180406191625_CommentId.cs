using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class CommentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Feedback_CommentId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CommentId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "Feedback",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_ProductId",
                table: "Feedback",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedback_Products_ProductId",
                table: "Feedback",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedback_Products_ProductId",
                table: "Feedback");

            migrationBuilder.DropIndex(
                name: "IX_Feedback_ProductId",
                table: "Feedback");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Feedback");

            migrationBuilder.AddColumn<string>(
                name: "CommentId",
                table: "Products",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_CommentId",
                table: "Products",
                column: "CommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Feedback_CommentId",
                table: "Products",
                column: "CommentId",
                principalTable: "Feedback",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
