using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class SubFeedback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FeedbackId",
                table: "Feedback",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_FeedbackId",
                table: "Feedback",
                column: "FeedbackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedback_Feedback_FeedbackId",
                table: "Feedback",
                column: "FeedbackId",
                principalTable: "Feedback",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedback_Feedback_FeedbackId",
                table: "Feedback");

            migrationBuilder.DropIndex(
                name: "IX_Feedback_FeedbackId",
                table: "Feedback");

            migrationBuilder.DropColumn(
                name: "FeedbackId",
                table: "Feedback");
        }
    }
}
