using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services
builder.Services.AddControllers();

// ✅ Enable CORS so frontend (Vite on port 5173) can talk to backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
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
