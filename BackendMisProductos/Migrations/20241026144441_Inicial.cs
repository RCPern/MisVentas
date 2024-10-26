using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendMisProductos.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "clientes",
                columns: table => new
                {
                    codigoCliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombres = table.Column<string>(type: "varchar(100)", nullable: false),
                    apellidos = table.Column<string>(type: "varchar(100)", nullable: false),
                    NIT = table.Column<int>(type: "int", nullable: false),
                    direccion = table.Column<string>(type: "varchar(100)", nullable: false),
                    categoriaCliente = table.Column<string>(type: "varchar(100)", nullable: false),
                    estadoCliente = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clientes", x => x.codigoCliente);
                });

            migrationBuilder.CreateTable(
                name: "productos",
                columns: table => new
                {
                    codigoProducto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    descripcion = table.Column<string>(type: "varchar(100)", nullable: false),
                    codigoProveedor = table.Column<int>(type: "int", nullable: false),
                    fechaVencimiento = table.Column<string>(type: "varchar(10)", nullable: false),
                    ubicacionFisica = table.Column<string>(type: "varchar(100)", nullable: false),
                    existenciaMinima = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productos", x => x.codigoProducto);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "clientes");

            migrationBuilder.DropTable(
                name: "productos");
        }
    }
}
