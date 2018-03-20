using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class NewFixDomain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Encyclopedia");

            migrationBuilder.DropIndex(
                name: "IX_ZNO_StationeryId",
                table: "ZNO");

            migrationBuilder.DropIndex(
                name: "IX_WritingSupplies_StationeryId",
                table: "WritingSupplies");

            migrationBuilder.DropIndex(
                name: "IX_Sticker_StationeryId",
                table: "Sticker");

            migrationBuilder.DropIndex(
                name: "IX_Stationery_CatalogId",
                table: "Stationery");

            migrationBuilder.DropIndex(
                name: "IX_SchoolSupplies_StationeryId",
                table: "SchoolSupplies");

            migrationBuilder.DropIndex(
                name: "IX_SchoolFolder_StationeryId",
                table: "SchoolFolder");

            migrationBuilder.DropIndex(
                name: "IX_OfficeSupplies_StationeryId",
                table: "OfficeSupplies");

            migrationBuilder.DropIndex(
                name: "IX_OfficeFolder_StationeryId",
                table: "OfficeFolder");

            migrationBuilder.DropIndex(
                name: "IX_NoteBook_StationeryId",
                table: "NoteBook");

            migrationBuilder.DropIndex(
                name: "IX_Gift_CatalogId",
                table: "Gift");

            migrationBuilder.DropIndex(
                name: "IX_Dictionary_StationeryId",
                table: "Dictionary");

            migrationBuilder.DropIndex(
                name: "IX_CopyBook_StationeryId",
                table: "CopyBook");

            migrationBuilder.DropIndex(
                name: "IX_Book_CatalogId",
                table: "Book");

            migrationBuilder.CreateTable(
                name: "ForCopybooks",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    SchoolFolderId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForCopybooks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForCopybooks_SchoolFolder_SchoolFolderId",
                        column: x => x.SchoolFolderId,
                        principalTable: "SchoolFolder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ForWorks",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    SchoolFolderId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForWorks_SchoolFolder_SchoolFolderId",
                        column: x => x.SchoolFolderId,
                        principalTable: "SchoolFolder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ZNO_StationeryId",
                table: "ZNO",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WritingSupplies_StationeryId",
                table: "WritingSupplies",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Sticker_StationeryId",
                table: "Sticker",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Stationery_CatalogId",
                table: "Stationery",
                column: "CatalogId",
                unique: true,
                filter: "[CatalogId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolSupplies_StationeryId",
                table: "SchoolSupplies",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolFolder_StationeryId",
                table: "SchoolFolder",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeSupplies_StationeryId",
                table: "OfficeSupplies",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeFolder_StationeryId",
                table: "OfficeFolder",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_NoteBook_StationeryId",
                table: "NoteBook",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Gift_CatalogId",
                table: "Gift",
                column: "CatalogId",
                unique: true,
                filter: "[CatalogId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Dictionary_StationeryId",
                table: "Dictionary",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CopyBook_StationeryId",
                table: "CopyBook",
                column: "StationeryId",
                unique: true,
                filter: "[StationeryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Book_CatalogId",
                table: "Book",
                column: "CatalogId",
                unique: true,
                filter: "[CatalogId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ForCopybooks_SchoolFolderId",
                table: "ForCopybooks",
                column: "SchoolFolderId",
                unique: true,
                filter: "[SchoolFolderId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ForWorks_SchoolFolderId",
                table: "ForWorks",
                column: "SchoolFolderId",
                unique: true,
                filter: "[SchoolFolderId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ForCopybooks");

            migrationBuilder.DropTable(
                name: "ForWorks");

            migrationBuilder.DropIndex(
                name: "IX_ZNO_StationeryId",
                table: "ZNO");

            migrationBuilder.DropIndex(
                name: "IX_WritingSupplies_StationeryId",
                table: "WritingSupplies");

            migrationBuilder.DropIndex(
                name: "IX_Sticker_StationeryId",
                table: "Sticker");

            migrationBuilder.DropIndex(
                name: "IX_Stationery_CatalogId",
                table: "Stationery");

            migrationBuilder.DropIndex(
                name: "IX_SchoolSupplies_StationeryId",
                table: "SchoolSupplies");

            migrationBuilder.DropIndex(
                name: "IX_SchoolFolder_StationeryId",
                table: "SchoolFolder");

            migrationBuilder.DropIndex(
                name: "IX_OfficeSupplies_StationeryId",
                table: "OfficeSupplies");

            migrationBuilder.DropIndex(
                name: "IX_OfficeFolder_StationeryId",
                table: "OfficeFolder");

            migrationBuilder.DropIndex(
                name: "IX_NoteBook_StationeryId",
                table: "NoteBook");

            migrationBuilder.DropIndex(
                name: "IX_Gift_CatalogId",
                table: "Gift");

            migrationBuilder.DropIndex(
                name: "IX_Dictionary_StationeryId",
                table: "Dictionary");

            migrationBuilder.DropIndex(
                name: "IX_CopyBook_StationeryId",
                table: "CopyBook");

            migrationBuilder.DropIndex(
                name: "IX_Book_CatalogId",
                table: "Book");

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
                name: "IX_ZNO_StationeryId",
                table: "ZNO",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_WritingSupplies_StationeryId",
                table: "WritingSupplies",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Sticker_StationeryId",
                table: "Sticker",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Stationery_CatalogId",
                table: "Stationery",
                column: "CatalogId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolSupplies_StationeryId",
                table: "SchoolSupplies",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolFolder_StationeryId",
                table: "SchoolFolder",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeSupplies_StationeryId",
                table: "OfficeSupplies",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeFolder_StationeryId",
                table: "OfficeFolder",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_NoteBook_StationeryId",
                table: "NoteBook",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Gift_CatalogId",
                table: "Gift",
                column: "CatalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Dictionary_StationeryId",
                table: "Dictionary",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_CopyBook_StationeryId",
                table: "CopyBook",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Book_CatalogId",
                table: "Book",
                column: "CatalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Encyclopedia_BookId",
                table: "Encyclopedia",
                column: "BookId");
        }
    }
}
