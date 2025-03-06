using Microsoft.EntityFrameworkCore;
using Taskmanager; // Ensure this using directive is present

namespace Taskmanager
{
    public class TaskDbContext : DbContext
    {
        public DbSet<Mytasks> Tasks { get; set; }

      
       protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source=C:\Users\hashi\source\repos\Taskmanager\Taskmanager\taskmanager.db");
        }
    }
}
