FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/velocity/Velocity.Api/Velocity.Api.csproj backend/velocity/Velocity.Api/
RUN dotnet restore backend/velocity/Velocity.Api/Velocity.Api.csproj
COPY backend/velocity/Velocity.Api backend/velocity/Velocity.Api
WORKDIR /src/backend/velocity/Velocity.Api
RUN dotnet publish Velocity.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "Velocity.Api.dll"]
