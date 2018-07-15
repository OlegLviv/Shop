﻿// <auto-generated />
using Core.Models.DomainModels;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;

namespace DAL.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Core.Models.DomainModels.CallMe", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<int>("CallMeStatus");

                    b.Property<long>("Date");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Phone")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("CallMe");
                });

            modelBuilder.Entity("Core.Models.DomainModels.Feedback", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<DateTime>("Date");

                    b.Property<string>("ProductId")
                        .IsRequired();

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("Core.Models.DomainModels.Mailing", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("Email")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Mailings");
                });

            modelBuilder.Entity("Core.Models.DomainModels.Order", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<long>("CreateDate");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("OrderStatus");

                    b.Property<string>("PhoneNumber")
                        .IsRequired();

                    b.Property<double>("TotalPrice");

                    b.Property<string>("UserId");

                    b.Property<string>("WayOfDelivery")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Core.Models.DomainModels.PossibleProductProperty", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("PropertyName")
                        .IsRequired();

                    b.Property<string>("SubCategory")
                        .IsRequired();

                    b.Property<string>("Values")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("PossibleProductProperties");
                });

            modelBuilder.Entity("Core.Models.DomainModels.Product", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("Category")
                        .IsRequired();

                    b.Property<string>("Description");

                    b.Property<int>("Discount");

                    b.Property<bool>("IsAvailable");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<double>("Price");

                    b.Property<double>("PriceWithDiscount");

                    b.Property<string>("Query")
                        .IsRequired();

                    b.Property<long>("Review");

                    b.Property<string>("SubCategory")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ProductImage", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("ContentType")
                        .IsRequired();

                    b.Property<byte[]>("Image")
                        .IsRequired();

                    b.Property<string>("ProductId");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductImage");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ProductOrderContainer", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<int>("Count");

                    b.Property<string>("OrderId");

                    b.Property<string>("ProductId");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductOrderContainer");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ProductProperty", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("Properties")
                        .IsRequired();

                    b.Property<string>("SubCategory")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("ProductProperties");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ShopingCard", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("ProductId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("ShopingCard");
                });

            modelBuilder.Entity("Core.Models.DomainModels.SubFeedback", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36);

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<long>("Date");

                    b.Property<string>("FeedbackId")
                        .IsRequired();

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("FeedbackId");

                    b.ToTable("SubFeedback");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Core.Models.DomainModels.Role", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole");


                    b.ToTable("Role");

                    b.HasDiscriminator().HasValue("Role");
                });

            modelBuilder.Entity("Core.Models.DomainModels.User", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<bool>("IsSubscribedToMailing");

                    b.Property<string>("LastName");

                    b.Property<string>("Name");

                    b.ToTable("User");

                    b.HasDiscriminator().HasValue("User");
                });

            modelBuilder.Entity("Core.Models.DomainModels.Feedback", b =>
                {
                    b.HasOne("Core.Models.DomainModels.Product", "Product")
                        .WithMany("Feedbacks")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Core.Models.DomainModels.Order", b =>
                {
                    b.HasOne("Core.Models.DomainModels.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ProductImage", b =>
                {
                    b.HasOne("Core.Models.DomainModels.Product", "Product")
                        .WithMany("ProductImages")
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ProductOrderContainer", b =>
                {
                    b.HasOne("Core.Models.DomainModels.Order", "Order")
                        .WithMany("ProductsContainers")
                        .HasForeignKey("OrderId");

                    b.HasOne("Core.Models.DomainModels.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId");
                });

            modelBuilder.Entity("Core.Models.DomainModels.ShopingCard", b =>
                {
                    b.HasOne("Core.Models.DomainModels.User", "User")
                        .WithOne("ShopingCard")
                        .HasForeignKey("Core.Models.DomainModels.ShopingCard", "UserId");
                });

            modelBuilder.Entity("Core.Models.DomainModels.SubFeedback", b =>
                {
                    b.HasOne("Core.Models.DomainModels.Feedback", "Feedback")
                        .WithMany("SubFeedbacks")
                        .HasForeignKey("FeedbackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
