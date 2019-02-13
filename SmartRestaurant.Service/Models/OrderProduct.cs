using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartRestaurant.Service.Models
{
    public class OrderProduct
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int ProductID { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
