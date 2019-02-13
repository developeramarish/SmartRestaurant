using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartRestaurant.Service.Models
{
    public class Order
    {
        public int ID { get; set; }

        [Required]
        [StringLength(25)]
        public string OrderName { get; set; }

        public string Total { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
