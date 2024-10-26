

// Add services to the container.



using BackendMisProductos;

var app = Startup.inicializarApp(args);
app.UseCors(x => x.AllowAnyMethod()
                  .AllowAnyHeader()
                  .SetIsOriginAllowed(origin => true) // allow any origin
                  .AllowCredentials());
app.Run();  


