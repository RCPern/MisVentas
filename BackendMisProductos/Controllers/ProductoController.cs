using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendMisProductos;
using BackendMisProductos.Models;

namespace BackendMisProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly AplicationDBContext _context;

        public ProductoController(AplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Producto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> Getproductos()
        {
            return await _context.productos.ToListAsync();
        }

        // GET: api/Producto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(string id)
        {
            try
            {
                // Validar el término de búsqueda
                if (string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest("El término de búsqueda no puede estar vacío.");
                }

                // Realizar la búsqueda
                var productos = await _context.productos
                    .Where(c => c.codigoProducto.ToString().Contains(id) ||    
                                c.descripcion.Contains(id) ||
                                c.fechaVencimiento.Contains(id))
                    .ToListAsync();

                if (!productos.Any())
                {
                    return NotFound("No se encontraron coincidencias.");
                }

                return Ok(productos);
            }
            catch (Exception ex)
            {
                // Aquí puedes loguear el error con un logger
                return StatusCode(500, "Error interno del servidor.");
            }
        }

        // PUT: api/Producto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, Producto producto)
        {
            if (id != producto.codigoProducto)
            {
                return BadRequest();
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Producto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            _context.productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducto", new { id = producto.codigoProducto }, producto);
        }

        // DELETE: api/Producto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoExists(int id)
        {
            return _context.productos.Any(e => e.codigoProducto == id);
        }
    }
}
