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
    public class OrderTotalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderTotalsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderTotals/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = await _context.Orders.FindAsync(id);
            var orders = await _context.OrderProducts.Where(o => o.OrderID == id).Include(o => o.Product).ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            double total = 0;

            foreach (var item in orders)
            {
                total += (item.Product.Price + (item.Product.Price * item.Product.Tax / 100)) * item.Quantity;
            }

            order.Total = total;
            order.IsActive = true;

            await _context.SaveChangesAsync();

            return Ok(total);
        }

        private bool OrderProductExists(int id)
        {
            return _context.OrderProducts.Any(e => e.ID == id);
        }
    }
}