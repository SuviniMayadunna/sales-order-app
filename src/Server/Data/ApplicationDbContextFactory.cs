using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace SalesOrder.Api.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            
            // Use SQLite for easy setup (no SQL Server required)
            optionsBuilder.UseSqlite("Data Source=SalesOrder.db");
            
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
