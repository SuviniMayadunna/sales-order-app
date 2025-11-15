using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesOrder.Api.Models;
using SalesOrder.Api.Services;

namespace SalesOrder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesOrdersController : ControllerBase
    {
        private readonly SalesOrderService _service;
        
        public SalesOrdersController(SalesOrderService service)
        {
            _service = service;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Models.SalesOrder>>> GetAll()
        {
            var orders = await _service.GetAllSalesOrdersAsync();
            return Ok(orders);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.SalesOrder>> GetById(int id)
        {
            var order = await _service.GetSalesOrderByIdAsync(id);
            if (order == null)
                return NotFound();
            
            return Ok(order);
        }
        
        [HttpPost]
        public async Task<ActionResult<Models.SalesOrder>> Create(Models.SalesOrder salesOrder)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                    return BadRequest(new { message = "Validation failed", errors = errors });
                }
                
                var createdOrder = await _service.CreateSalesOrderAsync(salesOrder);
                return CreatedAtAction(nameof(GetById), new { id = createdOrder.SalesOrderId }, createdOrder);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, innerMessage = ex.InnerException?.Message });
            }
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.SalesOrder>> Update(int id, Models.SalesOrder salesOrder)
        {
            if (id != salesOrder.SalesOrderId)
                return BadRequest();
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var updatedOrder = await _service.UpdateSalesOrderAsync(salesOrder);
            if (updatedOrder == null)
                return NotFound();
            
            return Ok(updatedOrder);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _service.DeleteSalesOrderAsync(id);
            if (!result)
                return NotFound();
            
            return NoContent();
        }
    }
    
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly SalesOrderService _service;
        
        public CustomersController(SalesOrderService service)
        {
            _service = service;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetAll()
        {
            var customers = await _service.GetAllCustomersAsync();
            return Ok(customers);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetById(int id)
        {
            var customer = await _service.GetCustomerByIdAsync(id);
            if (customer == null)
                return NotFound();
            
            return Ok(customer);
        }
    }
}
