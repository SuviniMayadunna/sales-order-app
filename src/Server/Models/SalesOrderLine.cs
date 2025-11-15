using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesOrder.Api.Models
{
    public class SalesOrderLine
    {
        [Key]
        public int SalesOrderLineId { get; set; }
        
        [Required]
        public int SalesOrderId { get; set; }
        
        [ForeignKey("SalesOrderId")]
        public virtual SalesOrder? SalesOrder { get; set; }
        
        [StringLength(50)]
        public string ItemCode { get; set; }
        
        [StringLength(500)]
        public string Description { get; set; }
        
        [StringLength(500)]
        public string Note { get; set; }
        
        public int Quantity { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Tax { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal ExclAmount { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TaxAmount { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal InclAmount { get; set; }
    }
}
