using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Sockets;
using System.Runtime.InteropServices;

namespace BackendMisClientes.Models
{


    public class Cliente
    {


        [Key]
        public int codigoCliente { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string nombres { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string apellidos { get; set; }

        public int NIT { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string direccion { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string categoriaCliente { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string estadoCliente { get; set; }


    }
}
