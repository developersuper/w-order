using Menubly.Api;
using Menubly.Host.Extensions;
using Menubly.Host.Middleware;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Net.Http.Headers;
using Serilog;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
const string DefaultCorsPolicyName = "Default";

// Configure global shared logger
builder.Host.UseSerilog();
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: DefaultCorsPolicyName,
                      policy => policy
                      .WithOrigins(builder.Configuration["App:CorsOrigins"]
                                            .Split(",", StringSplitOptions.RemoveEmptyEntries)
                                            .ToArray())
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .WithHeaders(HeaderNames.ContentType, "x-custom-header")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// Add controllers from API project via assembly name
builder.Services.AddControllers().AddApplicationPart(typeof(AssemblyReference).Assembly);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetAssembly(typeof(AssemblyReference))?.GetName().Name}.xml";
    if (string.IsNullOrEmpty(xmlFilename)) return;
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

// Configure service life-cycle
builder.Services.CustomConfigureDependencies(builder.Configuration);

// Configure PostgreSQL DBContext
builder.Services.CustomConfigureDatabase(builder.Configuration);

// Configure auto mapper profiles
builder.Services.AddAutoMapper(typeof(Menubly.Application.AutoMapperProfiles.AssemblyReference));
builder.Services.AddHealthChecks();

// Custom authorization using AWS Cognito
builder.Services.CustomConfigureAuthorization(builder.Configuration);

// Custom email configuration
builder.Services.CustomConfigureEmail(builder.Configuration);

// Configure general app settings
builder.Services.ConfigureAppSettings(builder.Configuration);

// Configure .NET in-memory cache for small objects.
builder.Services.AddMemoryCache();

// Add Sentry
builder.WebHost.UseSentry();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseForwardedHeaders();

Log.Information($"Environment: {app.Environment.EnvironmentName}");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    Log.Information("Swagger enabled!");
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(DefaultCorsPolicyName);

app.UseSentryTracing();
Log.Information("Sentry enabled!");

// Register global exception handling middle-ware
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/healthz");

await app.RunAsync();
