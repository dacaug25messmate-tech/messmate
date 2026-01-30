
using Customer.Models;
using Customer.Repository;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Customer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:3000") // frontend origin
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            builder.Services.AddDbContext<P06MessmateContext>(options =>
            {
                options.UseMySql(
                builder.Configuration.GetConnectionString("MessmateDB"),
                ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MessmateDB"))
                );
            });

            builder.Services.AddScoped<CustomerMessRepository>();
            builder.Services.AddScoped<UserRepository>();




            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            // Enable CORS
            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}
