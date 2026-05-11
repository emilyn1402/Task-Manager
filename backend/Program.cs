using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add SQL Server + EF Core
// Read environment variable
var environment = builder.Environment.EnvironmentName;

// Connection strings
var sqlServerConnection = builder.Configuration.GetConnectionString("SqlServerConnection");
var sqliteConnection = builder.Configuration.GetConnectionString("SqliteConnection");

// Choose provider based on environment
if (environment == "Development" && Environment.GetEnvironmentVariable("CODESPACES") == "true")
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(sqliteConnection));
}
else
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(sqlServerConnection));
}

// ✅ Add services
builder.Services.AddControllers();

// ✅ Enable CORS so frontend (Vite on port 5175) can talk to backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins(
                    "http://localhost:5173",
                    "http://localhost:5175"
                                    )
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// ✅ Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseRouting();

// Apply CORS policy
app.UseCors("AllowFrontend");

app.UseAuthorization();

// ✅ Map controllers
app.MapControllers();

app.Run();
