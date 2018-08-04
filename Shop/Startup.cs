using System.IO;
using System.Text;
using AutoMapper;
using BLL.Services;
using BLL.Services.DevServices;
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
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
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
            AddLogging(services);

            services.AddDbContext<AppDbContext>(option =>
                option.UseSqlServer(Configuration.GetConnectionString(bool.Parse(Configuration["IsDevelop"])
                    ? "DevConnection"
                    : "ProdConnection")));

            AddIdentity(services);

            AddBearerAuthendification(services);

            services.AddTransient(typeof(IRepositoryAsync<>), typeof(RepositoryAsync<>));

            services.AddScoped<IDevServicesExecutor, DevServicesExecutor>();

            AddIEmailSender(services);

            AddServices(services);

            services.AddAutoMapper(x => x.AddProfile(new MappingsProfile()));

            services.AddMvc();

            AddSwaggerGen(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            UseFonts(app);

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
                    jwtBearerOptions.RequireHttpsMetadata = true;
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateAudience = true,
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

            services.AddTransient<IOrderService, OrderService>();
        }

        private static void UseFonts(IApplicationBuilder app)
        {
            var typeProvider = new FileExtensionContentTypeProvider();

            if (!typeProvider.Mappings.ContainsKey(".woff2"))
            {
                typeProvider.Mappings.Add(".woff2", "application/font-woff2");
            }
            if (!typeProvider.Mappings.ContainsKey(".woff"))
            {
                typeProvider.Mappings.Add(".woff", "application/font-woff");
            }
            if (!typeProvider.Mappings.ContainsKey(".ttf"))
            {
                typeProvider.Mappings.Add(".woff", "application/font-ttf");
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = typeProvider,
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Fonts"))
            });
        }

        private static void AddLogging(IServiceCollection services)
        {
            services.AddLogging(builder =>
            {
                builder.AddConsole();
            });
        }
    }
}
