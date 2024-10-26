using BackendMisProductos.Controllers;
using BackendMisProductos.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;

namespace BackendMisProductos
{
    public static class Startup
    {
        public static WebApplication inicializarApp(String[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigureServices(builder);
            var app =  builder.Build();
            Configure(app);
            return app;
        }

        private static void ConfigureServices(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllersWithViews();
            builder.Services.AddScoped<AplicationDBContext>();
            builder.Services.AddCors();
        }

        private static void Configure(WebApplication app)
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            //app.Run();
        }

        //public Startup(IConfiguration configuration)
        //{
        //    Configuration = configuration;
        //}

        //public IConfiguration Configuration { get; }


        //public void ConfigureServices(IServiceCollection services) 
        //{
        //    services.AddDbContext<AplicationDBContext>();
        //    //services.AddDbContext<AplicationDBContext>(options =>
        //    //        options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));

        //    //services.AddControllersWithViews();
        //    services.AddControllers();
        //    //services.AddSingleton<ProductoController, AplicationDBContext>();
        //    //services.AddScoped<IProducto,Producto>();
        //    //services.AddSingleton<IProducto, Producto>();


        //    //services.AddTransient<ProductoController>();
        //}
    }
}
