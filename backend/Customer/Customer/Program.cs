using Customer.Models;
using Customer.Repository;
using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;
using System.Text.Json.Serialization;

namespace Customer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Controllers + JSON
            builder.Services.AddControllers()
                .AddJsonOptions(x =>
                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            //  CORS
            //builder.Services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(policy =>
            //    {
            //        policy
            //            .WithOrigins("http://localhost:3000") // React frontend
            //            .AllowAnyHeader()
            //            .AllowAnyMethod();
            //    });
            //});

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // DB
            builder.Services.AddDbContext<P06MessmateContext>(options =>
            {
                options.UseMySql(
                    builder.Configuration.GetConnectionString("MessmateDB"),
                    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MessmateDB"))
                );
            });

            // Repositories
            builder.Services.AddScoped<CustomerMessRepository>();
            builder.Services.AddScoped<UserRepository>();


            // Add Steeltoe Discovery Client
            builder.Services.AddDiscoveryClient(builder.Configuration);

            var app = builder.Build();

            // Use Steeltoe Discovery Client
            app.UseDiscoveryClient();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            

           // app.UseHttpsRedirection();

            //  CORS 
           // app.UseCors();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
