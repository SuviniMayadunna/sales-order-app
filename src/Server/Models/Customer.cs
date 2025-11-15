using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SalesOrder.Api.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        
        [Required]
        [StringLength(200)]
        public string CustomerName { get; set; }
        
        [StringLength(300)]
        public string Address1 { get; set; }
        
        [StringLength(300)]
        public string Address2 { get; set; }
        
        [StringLength(300)]
        public string Address3 { get; set; }
        
        [StringLength(100)]
        public string Suburb { get; set; }
        
        [StringLength(50)]
        public string State { get; set; }
        
        [StringLength(20)]
        public string PostCode { get; set; }
        
        public virtual ICollection<SalesOrder> SalesOrders { get; set; }
    }
}
