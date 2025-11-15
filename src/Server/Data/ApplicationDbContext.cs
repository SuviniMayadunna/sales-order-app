   using Microsoft.EntityFrameworkCore;
using SalesOrder.Api.Models;

namespace SalesOrder.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Models.SalesOrder> SalesOrders { get; set; }
        public DbSet<SalesOrderLine> SalesOrderLines { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure relationships
            modelBuilder.Entity<Models.SalesOrder>()
                .HasOne(so => so.Customer)
                .WithMany(c => c.SalesOrders)
                .HasForeignKey(so => so.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<SalesOrderLine>()
                .HasOne(sol => sol.SalesOrder)
                .WithMany(so => so.SalesOrderLines)
                .HasForeignKey(sol => sol.SalesOrderId)
                .OnDelete(DeleteBehavior.Cascade);
            
            // Seed initial data
            modelBuilder.Entity<Customer>().HasData(
                new Customer 
                { 
                    CustomerId = 1, 
                    CustomerName = "John Doe",
                    Address1 = "123 Main Street",
                    Address2 = "",
                    Address3 = "",
                    Suburb = "Springfield",
                    State = "NSW",
                    PostCode = "2000"
                },
                new Customer 
                { 
                    CustomerId = 2, 
                    CustomerName = "Jane Smith",
                    Address1 = "456 Queen Street",
                    Address2 = "Suite 100",
                    Address3 = "",
                    Suburb = "Melbourne",
                    State = "VIC",
                    PostCode = "3000"
                },
                new Customer 
                { 
                    CustomerId = 3, 
                    CustomerName = "ABC Corporation",
                    Address1 = "789 Business Park",
                    Address2 = "Level 5",
                    Address3 = "",
                    Suburb = "Brisbane",
                    State = "QLD",
                    PostCode = "4000"
                }
            );
        }
    }
}