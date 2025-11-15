using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesOrder.Api.Data;
using SalesOrder.Api.Models;

namespace SalesOrder.Api.Services
{
    public class SalesOrderService
    {
        private readonly ApplicationDbContext _context;
        
        public SalesOrderService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            return await _context.Customers.ToListAsync();
        }
        
        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            return await _context.Customers.FindAsync(id);
        }
        
        public async Task<List<Models.SalesOrder>> GetAllSalesOrdersAsync()
        {
            return await _context.SalesOrders
                .Include(so => so.Customer)
                .Include(so => so.SalesOrderLines)
                .OrderByDescending(so => so.CreatedDate)
                .ToListAsync();
        }
        
        public async Task<Models.SalesOrder> GetSalesOrderByIdAsync(int id)
        {
            return await _context.SalesOrders
                .Include(so => so.Customer)
                .Include(so => so.SalesOrderLines)
                .FirstOrDefaultAsync(so => so.SalesOrderId == id);
        }
        
        public async Task<Models.SalesOrder> CreateSalesOrderAsync(Models.SalesOrder salesOrder)
        {
            // Calculate totals
            CalculateTotals(salesOrder);
            
            _context.SalesOrders.Add(salesOrder);
            await _context.SaveChangesAsync();
            
            return await GetSalesOrderByIdAsync(salesOrder.SalesOrderId);
        }
        
        public async Task<Models.SalesOrder> UpdateSalesOrderAsync(Models.SalesOrder salesOrder)
        {
            var existingOrder = await _context.SalesOrders
                .Include(so => so.SalesOrderLines)
                .FirstOrDefaultAsync(so => so.SalesOrderId == salesOrder.SalesOrderId);
            
            if (existingOrder == null)
                return null;
            
            // Update header
            existingOrder.CustomerId = salesOrder.CustomerId;
            existingOrder.InvoiceNo = salesOrder.InvoiceNo;
            existingOrder.InvoiceDate = salesOrder.InvoiceDate;
            existingOrder.ReferenceNo = salesOrder.ReferenceNo;
            existingOrder.Note = salesOrder.Note;
            existingOrder.ModifiedDate = System.DateTime.Now;
            
            // Remove old lines
            _context.SalesOrderLines.RemoveRange(existingOrder.SalesOrderLines);
            
            // Add new lines
            existingOrder.SalesOrderLines = salesOrder.SalesOrderLines;
            
            // Calculate totals
            CalculateTotals(existingOrder);
            
            await _context.SaveChangesAsync();
            
            return await GetSalesOrderByIdAsync(existingOrder.SalesOrderId);
        }
        
        public async Task<bool> DeleteSalesOrderAsync(int id)
        {
            var salesOrder = await _context.SalesOrders.FindAsync(id);
            if (salesOrder == null)
                return false;
            
            _context.SalesOrders.Remove(salesOrder);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        private void CalculateTotals(Models.SalesOrder salesOrder)
        {
            salesOrder.TotalExcl = 0;
            salesOrder.TotalTax = 0;
            salesOrder.TotalIncl = 0;
            
            foreach (var line in salesOrder.SalesOrderLines)
            {
                line.ExclAmount = line.Quantity * line.Price;
                line.TaxAmount = line.ExclAmount * (line.Tax / 100);
                line.InclAmount = line.ExclAmount + line.TaxAmount;
                
                salesOrder.TotalExcl += line.ExclAmount;
                salesOrder.TotalTax += line.TaxAmount;
                salesOrder.TotalIncl += line.InclAmount;
            }
        }
    }
}
