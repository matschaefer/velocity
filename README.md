# Velocity

Velocity is a full-stack luxury car rental platform for browsing premium vehicles, checking real-time availability, submitting booking requests, and managing fleet operations from an admin dashboard.

The project is built as a portfolio-ready production prototype with a Next.js frontend, an ASP.NET Core API, PostgreSQL persistence, Docker-based local development, role-based authentication, booking workflows, and admin tooling.

## Live Demo

https://velocityrent.vercel.app/

## Highlights

* Vehicle search with location, pickup date/time, and return date/time
* Modern date, time, and location pickers with shared selection state
* Vehicle detail pages with image gallery, pricing, availability, and WhatsApp inquiry flow
* User registration, login, account area, and booking overview
* Admin dashboard with reservations, fleet overview, and vehicle blocking for maintenance, cleaning, private use, or manual admin blocks
* PostgreSQL database with Entity Framework Core migrations
* ASP.NET Core Identity with role-based access for users and admins
* Docker Compose setup for frontend, backend, and database
* Deployment-ready structure for Vercel frontend and Docker-hosted backend

## Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide Icons

**Backend**

* ASP.NET Core 8
* C#
* Entity Framework Core
* ASP.NET Core Identity
* PostgreSQL
* Swagger / OpenAPI

**Infrastructure**

* Docker
* Docker Compose
* Vercel-ready frontend configuration
* Docker-ready API deployment

## Project Structure

```text
velocity/
  backend/
    velocity/
      Velocity.Api/          ASP.NET Core API
      docker-compose.yml     PostgreSQL-only helper compose file
  frontend/
    velocity-frontend/       Next.js frontend
  docker-compose.yml         Full local stack: frontend, API, PostgreSQL
  DEPLOYMENT.md              Deployment notes
  Velocity.sln               .NET solution
```

## Local Development

### Prerequisites

* Docker Desktop
* Node.js 22+
* .NET SDK 8+

### Start the full stack

From the repository root:

```powershell
docker compose up --build
```

Services:

* Frontend: `http://localhost:3000`
* API / Swagger: `http://localhost:5267/swagger`
* PostgreSQL: `localhost:5432`

### Run frontend manually

```powershell
cd frontend/velocity-frontend
npm install
npm run dev
```

### Run backend manually

```powershell
cd backend/velocity
docker compose up -d
dotnet ef database update --project .\Velocity.Api\Velocity.Api.csproj
dotnet run --project .\Velocity.Api\Velocity.Api.csproj
```

## Environment Variables

Frontend example:

```text
NEXT_PUBLIC_API_URL=http://localhost:5267
```

Backend example:

```text
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=velocity;Username=velocity;Password=velocity
Cors__AllowedOrigins__0=http://localhost:3000
Database__MigrateOnStartup=true
SeedAdmin__Email=admin@example.test
SeedAdmin__Password=UseAStrongPassword123
```

Do not commit real `.env` files or production credentials.

## Admin Access

Admin seeding is controlled by environment variables:

```text
SeedAdmin__Email
SeedAdmin__Password
```

If these values are not set, no admin user is created automatically.

## Deployment

The frontend is deployed on Vercel:

* Live frontend: https://velocityrent.vercel.app/

Recommended deployment split:

* Frontend: Vercel
* Backend: Render, Fly.io, Railway, or Azure App Service using Docker
* Database: Neon, Supabase, Render PostgreSQL, Railway PostgreSQL, or managed PostgreSQL on Azure

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more details.

## Security Notes

This repository is intended to be safe for public portfolio use:

* No real user data should be committed
* No production database dumps should be committed
* No API keys, secrets, or real connection strings should be committed
* Local Docker credentials are development-only placeholders
* Production secrets must be configured in the hosting provider

Before publishing updates, run a quick scan:

```powershell
Get-ChildItem -Recurse -File |
  Where-Object {
    $_.FullName -notmatch '\\(bin|obj|node_modules|\.next|\.git|public)\\'
  } |
  Select-String -Pattern "Password|ConnectionStrings|Secret|api_key|token|velocity.local"
```

## Roadmap

* Stripe or Mollie payment integration
* Admin vehicle creation form with image upload
* Email notifications for booking status changes
* Full profile editing endpoints
* Production observability and structured logging
* Automated backend tests for booking availability rules

## Portfolio Context

Velocity demonstrates a complete full-stack workflow: UI design, booking UX, authentication, role-based authorization, relational data modeling, availability logic, admin operations, Dockerized development, and deployment preparation.
