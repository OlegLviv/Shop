using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class NewFixDomain3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DecorativeBox_GiftId",
                table: "DecorativeBox");

            migrationBuilder.DropIndex(
                name: "IX_Casket_GiftId",
                table: "Casket");

            migrationBuilder.CreateTable(
                name: "GiftProduct",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    CasketId = table.Column<string>(nullable: true),
                    Maker = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GiftProduct_Casket_CasketId",
                        column: x => x.CasketId,
                        principalTable: "Casket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DecorativeBox_GiftId",
                table: "DecorativeBox",
                column: "GiftId",
                unique: true,
                filter: "[GiftId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Casket_GiftId",
                table: "Casket",
                column: "GiftId",
                unique: true,
                filter: "[GiftId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_GiftProduct_CasketId",
                table: "GiftProduct",
                column: "CasketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GiftProduct");

            migrationBuilder.DropIndex(
                name: "IX_DecorativeBox_GiftId",
                table: "DecorativeBox");

            migrationBuilder.DropIndex(
                name: "IX_Casket_GiftId",
                table: "Casket");

            migrationBuilder.CreateIndex(
                name: "IX_DecorativeBox_GiftId",
                table: "DecorativeBox",
                column: "GiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Casket_GiftId",
                table: "Casket",
                column: "GiftId");
        }
    }
}
