#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Menubly.Migrator/Menubly.Migrator.csproj", "Menubly.Migrator/"]
RUN dotnet restore "Menubly.Migrator/Menubly.Migrator.csproj"
COPY . .
WORKDIR "/src/Menubly.Migrator"
RUN dotnet build "Menubly.Migrator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Menubly.Migrator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Menubly.Migrator.dll"]