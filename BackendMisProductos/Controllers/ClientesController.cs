using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendMisClientes.Models;
using BackendMisProductos;

namespace BackendMisProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly AplicationDBContext _context;

        public ClientesController(AplicationDBContext context)
        {
            _context = context;
        }

        // POST: api/Clientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            _context.clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCliente", new { id = cliente.codigoCliente }, cliente);
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> Getclientes()
        {
            return await _context.clientes.ToListAsync();
        }

        // GET: api/Clientes/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(string id)
        {

            try
            {
                // Validar el término de búsqueda
                if (string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest("El término de búsqueda no puede estar vacío.");
                }

                // Realizar la búsqueda
                var clientes = await _context.clientes
                    .Where(c => c.codigoCliente.ToString().Contains(id) ||
                                c.NIT.ToString().Contains(id) ||
                                c.estadoCliente.Contains(id) ||
                                c.nombres.Contains(id) ||
                                c.apellidos.Contains(id))
                    .ToListAsync();

                if (!clientes.Any())
                {
                    return NotFound("No se encontraron coincidencias.");
                }

                return Ok(clientes);
            }
            catch (Exception ex)
            {
                // Aquí puedes loguear el error con un logger
                return StatusCode(500, "Error interno del servidor.");
            }
        }


        //// GET: api/Clientes/{searchTerm}
        //[HttpGet("{searchTerm}")]
        //public async Task<ActionResult<IEnumerable<Cliente>>> GetCliente(string searchTerm)
        //{
        //    try
        //    {
        //        // Validar el término de búsqueda
        //        if (string.IsNullOrWhiteSpace(searchTerm))
        //        {
        //            return BadRequest("El término de búsqueda no puede estar vacío.");
        //        }

        //        // Realizar la búsqueda
        //        var clientes = await _context.clientes
        //            .Where(c => c.codigoCliente.ToString().Contains(searchTerm)||
        //                        c.NIT.ToString().Contains(searchTerm) ||
        //                        c.estadoCliente.Contains(searchTerm) ||
        //                        c.nombres.Contains(searchTerm) ||
        //                        c.apellidos.Contains(searchTerm))
        //            .ToListAsync();

        //        if (!clientes.Any())
        //        {
        //            return NotFound("No se encontraron coincidencias.");
        //        }

        //        return Ok(clientes);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Aquí puedes loguear el error con un logger
        //        return StatusCode(500, "Error interno del servidor.");
        //    }
        //}


        // PUT: api/Clientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (id != cliente.codigoCliente)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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



        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _context.clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteExists(int id)
        {
            return _context.clientes.Any(e => e.codigoCliente == id);
        }
    }
}
