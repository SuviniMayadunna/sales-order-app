using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalesOrder.Api.Models
{
    public class SalesOrder
    {
        [Key]
        public int SalesOrderId { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
        
        [ForeignKey("CustomerId")]
        public virtual Customer? Customer { get; set; }
        
        [Required]
        [StringLength(50)]
        public string InvoiceNo { get; set; }
        
        [Required]
        public DateTime InvoiceDate { get; set; }
        
        [StringLength(100)]
        public string ReferenceNo { get; set; }
        
        [StringLength(500)]
        public string Note { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalExcl { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalTax { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalIncl { get; set; }
        
        public DateTime CreatedDate { get; set; }
        
        public DateTime? ModifiedDate { get; set; }
        
        public virtual ICollection<SalesOrderLine> SalesOrderLines { get; set; }
        
        public SalesOrder()
        {
            SalesOrderLines = new List<SalesOrderLine>();
            CreatedDate = DateTime.Now;
            InvoiceDate = DateTime.Now;
        }
    }
}
