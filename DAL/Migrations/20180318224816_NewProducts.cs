using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class NewProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DecorativeProducts");

            migrationBuilder.CreateTable(
                name: "DecorativeBox",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    GiftId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecorativeBox", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DecorativeBox_Gift_GiftId",
                        column: x => x.GiftId,
                        principalTable: "Gift",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Encyclopedia",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    BookId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Encyclopedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Encyclopedia_Book_BookId",
                        column: x => x.BookId,
                        principalTable: "Book",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DecorativeBox_GiftId",
                table: "DecorativeBox",
                column: "GiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Encyclopedia_BookId",
                table: "Encyclopedia",
                column: "BookId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DecorativeBox");

            migrationBuilder.DropTable(
                name: "Encyclopedia");

            migrationBuilder.CreateTable(
                name: "DecorativeProducts",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    GiftId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecorativeProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DecorativeProducts_Gift_GiftId",
                        column: x => x.GiftId,
                        principalTable: "Gift",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DecorativeProducts_GiftId",
                table: "DecorativeProducts",
                column: "GiftId");
        }
    }
}
