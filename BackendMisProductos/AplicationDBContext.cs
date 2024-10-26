using BackendMisClientes.Models;
using BackendMisProductos.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendMisProductos
{
    public class AplicationDBContext : DbContext
    {
        //public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options) { }



        public AplicationDBContext()
        {
        }

        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=MisVentasSA;Trusted_Connection=True;TrustServerCertificate=true;");


            //optionsBuilder.UseSqlServer("DESKTOP - GKHEKCA\\SQLEXPRESS");
        }

        public DbSet<Producto> productos { get; set; }
        public DbSet<Cliente> clientes { get; set; }
    }
}





