using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartRestaurant.Service.Data;
using SmartRestaurant.Service.Models;

namespace SmartRestaurant.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderProducts
        [HttpGet]
        public IEnumerable<OrderProduct> GetOrderProducts()
        {
            return _context.OrderProducts;
        }

        // GET: api/OrderProducts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderProducts = await _context.OrderProducts.Where(o => o.OrderID == id).Include(o => o.Product).ToListAsync();

            if (orderProducts == null)
            {
                return NotFound();
            }

            return Ok(orderProducts);
        }

        // PUT: api/OrderProducts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderProduct([FromRoute] int id, [FromBody] OrderProduct orderProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderProduct.ID)
            {
                return BadRequest();
            }

            var existingOrderProduct = await _context.OrderProducts.FindAsync(id);

            existingOrderProduct.IsDone = !existingOrderProduct.IsDone;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderProducts
        [HttpPost]
        public async Task<IActionResult> PostOrderProduct([FromBody] OrderProduct orderProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.OrderProducts.Add(orderProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderProduct", new { id = orderProduct.ID }, orderProduct);
        }

        // DELETE: api/OrderProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderProduct = await _context.OrderProducts.FindAsync(id);
            if (orderProduct == null)
            {
                return NotFound();
            }

            _context.OrderProducts.Remove(orderProduct);
            await _context.SaveChangesAsync();

            return Ok(orderProduct);
        }

        private bool OrderProductExists(int id)
        {
            return _context.OrderProducts.Any(e => e.ID == id);
        }
    }
}