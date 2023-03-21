[![Staging Build](https://github.com/menubly/menubly-api/actions/workflows/dev-cicd.yml/badge.svg)](https://github.com/menubly/menubly-api/actions/workflows/dev-cicd.yml)
[![Production Build](https://github.com/menubly/menubly-api/actions/workflows/prod-cicd.yml/badge.svg?branch=main)](https://github.com/menubly/menubly-api/actions/workflows/prod-cicd.yml)

# Menubly API

### Infrastructure Information
```
- Compute service: AWS App Runner/ECS Fargate
- Region: US East (N. Virginia) us-east-1
- Container registry: AWS ECR
- Authorization provider: AWS Cognito
- Containerization technology: Docker (Linux)
- Framework: .NET 6.0
- Database: PostgreSQL 
- Environment: DEV/Staging/Production
- Email provider: SMTP or Sendgrid
```

### Project Reference Diagram
![menubly](https://user-images.githubusercontent.com/119122957/205085902-9fb71b83-0925-49b8-b401-eb0144398fc4.jpg)

Warning: _The green projects should NOT depend on any external providers (database, email, authentication etc...)._

### Project Structure

```
├── Menubly.Host                   # App startup and lifetime management
    ├── Extensions                  # Extension class 
    ├── Middleware                  # Middleware definition class
├── Menubly.Api                    # Web API
    ├── Controllers                 # API Controllers
├── Menubly.Application            # Service implementations
    ├── AutoMapperProfiles          # AutoMapper profile class
├── Menubly.Application.Contracts  # Services interfaces and data contract
    ├── Dto                         # Data transfer object class
├── Menubly.Domain                 # Core layer, define entity and domain service here
    ├── DomainModels                # Domain service models  
    ├── DomainServices              # Domain service interfaces  
    ├── Entities                    # Domain entity class
    ├── Enums                       # Domain enum definitions
    ├── Exceptions                  # Application exception class
    ├── Repositories                # Repository interfaces
    ├── Settings                    # Domain settings class
├── Menubly.Infrastructure         # DbContext, repository and migrations
    ├── DomainServices              # Domain service implementations
    ├── EntityConfigurations        # EfCore entity configurations files (Influent API)
    ├── Migrations                  # Auto-generated migration files and DB snapshot
    ├── Repositories                # Repository implementations
├── Menubly.Migrator               # Handle database migration
```
### Build Guidelines
#### Prerequisites
- Visual Studio installed.
- Postgres database installed.
- Docker Desktop (if developers want to run application as container).
 
#### Visual Studio Mode
- Set Menubly.Host as startup project.
- Set secrets.json on Menubly.Host project as below:
```
"ConnectionStrings": {
    "MenublyDatabase": "Host=localhost;Database=Menubly;Username=postgres;Password={your_password};Port=5432"
  }
```
- Run web host (https://localhost:7124/swagger/index.html).

#### Docker Mode
- Modify file appsettings.Development.json on Menubly.Host project as below, noticed that the host will be different (host.docker.internal), if we use localhost, our docker container can't connect to Postgres DB running on host machine:
```
"ConnectionStrings": {
    "MenublyDatabase": "Host=host.docker.internal;Database=Menubly;Username=postgres;Password={your_password};Port=5432"
  }
```
- Navigate to solution folder (where the .sln file located).
- Build docker image.
```
docker build -f Menubly.Host/Dockerfile -t menubly-api .
```
- Run docker image.
```
docker container run -dt --name menubly-api -p 8080:80 menubly-api
```
- Observe result (http://localhost:8080/swagger/index.html).

### Official documents
https://docs.microsoft.com/en-us/aspnet/core/fundamentals/?view=aspnetcore-6.0&tabs=windows 
