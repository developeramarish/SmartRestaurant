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
    public class DailyGainsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DailyGainsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DailyGains
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            var payments = await _context.Payments.Where(p => p.CreatedAt.Date == DateTime.Today.Date).ToListAsync();

            double total = 0;
            foreach (var payment in payments)
                total += payment.Total;

            return Ok(total);
        }

        private bool PaymentExists(int id)
        {
            return _context.Payments.Any(e => e.ID == id);
        }
    }
}