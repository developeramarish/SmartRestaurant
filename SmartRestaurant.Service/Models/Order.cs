using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartRestaurant.Service.Models
{
    public class Order
    {
        public int ID { get; set; }
        public int TableID { get; set; }

        [Required]
        [StringLength(35)]
        public string OrderName { get; set; }

        public double Total { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey("TableID")]
        public virtual Table Table { get; set; }
        public virtual IEnumerable<OrderProduct> Products { get; set; }
    }
}
