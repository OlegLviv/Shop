using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DAL.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    LastName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    SecurityStamp = table.Column<string>(nullable: true),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

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
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    CatalogId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Book_Catalog_CatalogId",
                        column: x => x.CatalogId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Gift",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    CatalogId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gift", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gift_Catalog_CatalogId",
                        column: x => x.CatalogId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "Casket",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 36, nullable: false),
                    GiftId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Casket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Casket_Gift_GiftId",
                        column: x => x.GiftId,
                        principalTable: "Gift",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Book_CatalogId",
                table: "Book",
                column: "CatalogId");

            migrationBuilder.CreateIndex(
                name: "IX_Casket_GiftId",
                table: "Casket",
                column: "GiftId");

            migrationBuilder.CreateIndex(
                name: "IX_CopyBook_StationeryId",
                table: "CopyBook",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_DecorativeProducts_GiftId",
                table: "DecorativeProducts",
                column: "GiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Dictionary_StationeryId",
                table: "Dictionary",
                column: "StationeryId");

            migrationBuilder.CreateIndex(
                name: "IX_Gift_CatalogId",
                table: "Gift",
                column: "CatalogId");

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
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropTable(
                name: "Casket");

            migrationBuilder.DropTable(
                name: "CopyBook");

            migrationBuilder.DropTable(
                name: "DecorativeProducts");

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
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Gift");

            migrationBuilder.DropTable(
                name: "Stationery");

            migrationBuilder.DropTable(
                name: "Catalog");
        }
    }
}
