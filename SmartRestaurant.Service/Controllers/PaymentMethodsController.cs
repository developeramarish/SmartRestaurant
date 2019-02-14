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
    public class PaymentMethodsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentMethodsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PaymentMethods
        [HttpGet]
        public IEnumerable<PaymentMethod> GetPaymentMethods()
        {
            return _context.PaymentMethods;
        }

        // GET: api/PaymentMethods/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentMethod([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paymentMethod = await _context.PaymentMethods.FindAsync(id);

            if (paymentMethod == null)
            {
                return NotFound();
            }

            return Ok(paymentMethod);
        }

        // PUT: api/PaymentMethods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentMethod([FromRoute] int id, [FromBody] PaymentMethod paymentMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentMethod.ID)
            {
                return BadRequest();
            }

            _context.Entry(paymentMethod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentMethodExists(id))
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

        // POST: api/PaymentMethods
        [HttpPost]
        public async Task<IActionResult> PostPaymentMethod([FromBody] PaymentMethod paymentMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PaymentMethods.Add(paymentMethod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentMethod", new { id = paymentMethod.ID }, paymentMethod);
        }

        // DELETE: api/PaymentMethods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethod([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var paymentMethod = await _context.PaymentMethods.FindAsync(id);
            if (paymentMethod == null)
            {
                return NotFound();
            }

            _context.PaymentMethods.Remove(paymentMethod);
            await _context.SaveChangesAsync();

            return Ok(paymentMethod);
        }

        private bool PaymentMethodExists(int id)
        {
            return _context.PaymentMethods.Any(e => e.ID == id);
        }
    }
}