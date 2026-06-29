# Deployment

## Frontend auf Vercel

1. GitHub-Repository mit diesem Projekt verbinden.
2. In Vercel als Root Directory setzen:

```text
frontend/velocity-frontend
```

3. Environment Variable setzen:

```text
NEXT_PUBLIC_API_URL=https://deine-backend-url
```

4. Build Command:

```text
npm run build
```

5. Install Command:

```text
npm ci
```

## Backend kostenlos starten

Für ein .NET-Backend ist Vercel nicht die passende Plattform. Vercel ist sehr gut für Next.js, aber nicht für dauerhaft laufende ASP.NET-Core-APIs.

Empfehlung für den Start:

- Render Web Service für die ASP.NET-Core-API per Docker
- Render PostgreSQL oder eine externe PostgreSQL-Datenbank wie Neon/Supabase

Wichtig: Kostenlose Datenbanken sind oft zeitlich begrenzt oder schlafen ein. Für echte Nutzerdaten solltest du spätestens vor Launch auf einen bezahlten PostgreSQL-Plan wechseln.

## Render Backend Schritte

1. Neues Web Service auf Render anlegen.
2. GitHub-Repo verbinden.
3. Runtime: Docker.
4. Dockerfile Path:

```text
backend/velocity/Velocity.Api/Dockerfile
```

5. Environment Variables setzen:

```text
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:8080
ConnectionStrings__DefaultConnection=Host=...;Port=5432;Database=...;Username=...;Password=...
Cors__AllowedOrigins__0=https://deine-vercel-domain.vercel.app
SeedAdmin__Email=admin@velocityrent.de
SeedAdmin__Password=ein-starkes-passwort
Database__MigrateOnStartup=true
```

## Öffentliches GitHub-Repo sicher halten

In ein öffentliches Portfolio-Repo gehören:

- Code
- `README.md`
- `.env.example`
- Dockerfiles
- Beispiel-Daten

Nicht ins Repo gehören:

- echte `.env` Dateien
- echte Datenbank-Backups
- produktive Connection Strings
- Admin-Passwörter
- API Keys
- Kundendaten

Die echte Datenbank liegt privat beim Hoster. GitHub enthält nur das Schema/Migrationen, aber keine Kundendaten.
