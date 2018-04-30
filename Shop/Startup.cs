﻿using System.Text;
using AutoMapper;
using BLL.Services;
using BLL.Services.Interfaces;
using Core.Interfaces;
using Core.Mapper;
using Core.Models.DomainModels;
using DAL;
using DAL.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace Shop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(option =>
             option.UseSqlServer(Configuration.GetConnectionString(bool.Parse(Configuration["IsDevelop"]) ? "DevConnection" : "ProdConnection")));

            AddIdentity(services);

            AddBearerAuthendification(services);

            services.AddTransient(typeof(IRepositoryAsync<>), typeof(RepositoryAsync<>));

            AddIEmailSender(services);

            AddServices(services);

            services.AddAutoMapper(x => x.AddProfile(new MappingsProfile()));

            services.AddMvc();

            AddSwaggerGen(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // TODO need remov this
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute(
                  name: "spa-fallback",
                  defaults: new { controller = "Home", action = "Index" });
            });
        }

        private void AddBearerAuthendification(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddCookie()
                .AddJwtBearer(jwtBearerOptions =>
                {
                    jwtBearerOptions.RequireHttpsMetadata = false;
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateActor = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Token:Issuer"],
                        ValidAudience = Configuration["Token:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
                            (Configuration["Token:Key"]))
                    };
                });
        }

        private void AddIEmailSender(IServiceCollection services)
        {
            services.AddTransient<IEmailSender, EmailSender>(service => new EmailSender(new System.Net.NetworkCredential
            {
                UserName = Configuration["EmailCredential:UserName"],
                Password = Configuration["EmailCredential:Password"]
            },
                host: Configuration["SmtpData:Host"],
                port: int.Parse(Configuration["SmtpData:Port"])
            ));
        }

        private static void AddIdentity(IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequiredUniqueChars = 0;
                    options.Password.RequireNonAlphanumeric = false;

                    options.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddUserManager<UserManager<User>>()
                .AddSignInManager<SignInManager<User>>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddDefaultTokenProviders();
        }

        private static void AddSwaggerGen(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
            });
        }

        private static void AddServices(IServiceCollection services)
        {
            services.AddTransient(impl => new ProductService(impl.GetService<IRepositoryAsync<ProductProperty>>(),
                impl.GetService<IRepositoryAsync<PossibleProductProperty>>()));

            services.AddTransient<IOrderService, OrderService>(impl =>
                new OrderService(impl.GetService<IRepositoryAsync<Product>>()));
        }
    }
}
