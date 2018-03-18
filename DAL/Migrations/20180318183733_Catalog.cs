using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class Catalog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Catalog",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Catalog", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stationery",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    CatalogId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stationery", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stationery_Catalog_CatalogId",
                        column: x => x.CatalogId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CopyBook",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CopyBook", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CopyBook_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Dictionary",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dictionary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dictionary_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NoteBook",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteBook", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NoteBook_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OfficeFolder",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficeFolder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfficeFolder_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OfficeSupplies",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficeSupplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfficeSupplies_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolFolder",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolFolder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolFolder_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SchoolSupplies",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolSupplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolSupplies_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sticker",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sticker", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sticker_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WritingSupplies",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WritingSupplies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WritingSupplies_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ZNO",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    StationeryId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZNO", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ZNO_Stationery_StationeryId",
                        column: x => x.StationeryId,
                        principalTable: "Stationery",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CopyBook_StationeryId",
                table: "CopyBook",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Dictionary_StationeryId",
                table: "Dictionary",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_NoteBook_StationeryId",
                table: "NoteBook",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeFolder_StationeryId",
                table: "OfficeFolder",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeSupplies_StationeryId",
                table: "OfficeSupplies",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolFolder_StationeryId",
                table: "SchoolFolder",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolSupplies_StationeryId",
                table: "SchoolSupplies",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Stationery_CatalogId",
                table: "Stationery",
                column: "CatalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Sticker_StationeryId",
                table: "Sticker",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_WritingSupplies_StationeryId",
                table: "WritingSupplies",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_ZNO_StationeryId",
                table: "ZNO",
                column: "StationeryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CopyBook");

            migrationBuilder.DropTable(
                name: "Dictionary");

            migrationBuilder.DropTable(
                name: "NoteBook");

            migrationBuilder.DropTable(
                name: "OfficeFolder");

            migrationBuilder.DropTable(
                name: "OfficeSupplies");

            migrationBuilder.DropTable(
                name: "SchoolFolder");

            migrationBuilder.DropTable(
                name: "SchoolSupplies");

            migrationBuilder.DropTable(
                name: "Sticker");

            migrationBuilder.DropTable(
                name: "WritingSupplies");

            migrationBuilder.DropTable(
                name: "ZNO");

            migrationBuilder.DropTable(
                name: "Stationery");

            migrationBuilder.DropTable(
                name: "Catalog");
        }
    }
}
