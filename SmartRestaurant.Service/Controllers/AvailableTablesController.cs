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
    public class AvailableTablesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AvailableTablesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AvailableTables
        [HttpGet]
        public IEnumerable<Table> GetTables()
        {
            return _context.Tables.Where(t => t.IsAvailable == true);
        }

        private bool TableExists(int id)
        {
            return _context.Tables.Any(e => e.ID == id);
        }
    }
}