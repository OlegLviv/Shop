using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class FixSubFeeback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "SubFeedback",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    Body = table.Column<string>(maxLength: 255, nullable: false),
                    Date = table.Column<long>(nullable: false),
                    FeedbackId = table.Column<string>(nullable: false),
                    ProductId = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubFeedback", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubFeedback_Feedback_FeedbackId",
                        column: x => x.FeedbackId,
                        principalTable: "Feedback",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubFeedback_FeedbackId",
                table: "SubFeedback",
                column: "FeedbackId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubFeedback");

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
    }
}
