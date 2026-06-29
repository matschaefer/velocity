# Velocity Backend

ASP.NET Core 8 API fuer die Velocity Sportwagenvermietung.

## Lokal starten

### Komfortabel mit Docker

Im Repository-Hauptordner:

```powershell
docker compose up --build
```

Danach erreichbar:

- Frontend: `http://localhost:3000`
- API/Swagger: `http://localhost:5267/swagger`
- PostgreSQL: `localhost:5432`

Die Datenbankmigration wird im Docker-Setup automatisch beim API-Start ausgefuehrt.

### Admin lokal anlegen

Der Seed-Admin wird nur erstellt, wenn diese Umgebungsvariablen gesetzt sind:

```powershell
$env:SEED_ADMIN_EMAIL="admin@example.test"
$env:SEED_ADMIN_PASSWORD="EinStarkesPasswort123"
docker compose up --build
```

Fuer Produktion bitte starke Secrets und den Connection-String ausschliesslich ueber Hosting-Environment-Variables setzen.

### Manuell ohne Docker fuer Frontend/API

1. PostgreSQL starten:

```powershell
docker compose up -d
```

2. Pakete wiederherstellen und Datenbank aktualisieren:

```powershell
dotnet restore ..\..\Velocity.sln
dotnet ef database update --project .\Velocity.Api\Velocity.Api.csproj
```

3. API starten:

```powershell
dotnet run --project .\Velocity.Api\Velocity.Api.csproj
```
