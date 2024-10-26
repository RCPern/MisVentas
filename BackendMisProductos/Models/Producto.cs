using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Sockets;
using System.Runtime.InteropServices;

namespace BackendMisProductos.Models
{

    //public interface IProducto
    //{
    //    void WriteMessage(string message);
    //}

    public class Producto
    {

        
        [Key]
        public int codigoProducto { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string descripcion { get; set; }

        [Required]
        public int codigoProveedor { get; set; }

        [Required]
        [Column(TypeName = "varchar(10)")]
        public string fechaVencimiento { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string ubicacionFisica { get; set; }
        [Required]
        public int existenciaMinima { get; set; }

    }
}
