using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Menubly.Infrastructure;

// Initializes a new instance of the HostBuilder class with pre-configured defaults.
var builder = Host.CreateDefaultBuilder(args);

// Add configuration files.
var configurations = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false)
    .AddEnvironmentVariables()
    .AddUserSecrets<Program>()
    .Build();

// Register DbContext.
builder.ConfigureServices(service =>
service.AddDbContextPool<MenublyDbContext>(dbContextBuilder =>
{
    var connectionString = configurations.GetConnectionString("MenublyDatabase");
    if (connectionString is not null)
    {
        dbContextBuilder.UseNpgsql(connectionString);
    }
}));

var app = builder.Build();

// Apply migrations.
await using MenublyDbContext dbContext = app.Services.GetRequiredService<MenublyDbContext>();
await dbContext.Database.MigrateAsync();

// Keep the task running until new migration added.
await app.WaitForShutdownAsync();
