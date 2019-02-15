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
    public class MonthlyGainsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MonthlyGainsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MonthlyGains
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            var payments = await _context.Payments.Where(p => p.CreatedAt.Day <= p.CreatedAt.AddDays(30).Day).ToListAsync();

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