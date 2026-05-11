using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    // DbContext manages database connection and tables
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Represents the Tasks table in SQL
        public DbSet<TaskList> Tasks { get; set; }
    }
}
