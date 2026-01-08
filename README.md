# User Directory

A full-stack .NET 8 + React application exposing a REST API for managing directory entries backed by SQLite and delivered through Docker Compose.

## Application Structure

- **Backend (`backend/UserDirectory.Api`)**
  - ASP.NET Core Web API (targeting `net8.0` from `UserDirectory.Api.csproj`)
  - Uses EF Core 8.0 with SQLite, Swagger/OpenAPI, JWT Bearer + Microsoft Identity Web placeholders
  - Services (`UserService`) inject an `AppDbContext` for CRUD operations; controllers handle HTTP verbs with structured logging and error handling
  - Dockerfile creates a multi-stage build that restores, builds, publishes, and runs the API on port 8080

- **Frontend (`frontend`)**
  - React 19.2 + TypeScript, bundled via Vite 7.2
  - Axios abstracts API access (`userApi`) and React Router DOM 7.12 delivers navigation between listing, adding, and editing screens
  - Dockerfile builds via Node 20, serves production assets through Nginx

- **Integration**
  - `docker-compose.yml` defines backend and frontend services sharing `app-network`, mapping ports (5000/3000) and mounting a persistent SQLite database volume

- **Tests (`UserDirectory.Tests`)**
  - .NET test project referencing backend
  - xUnit + Moq + EF Core InMemory to verify controller behaviors and service contracts

## Development Process

1. **Local development**
   - Backend: `dotnet restore && dotnet run` inside `backend/UserDirectory.Api`
   - Frontend: `npm install && npm run dev` inside `frontend` (Vite dev server on port 3000)
   - Swagger UI: available via `http://localhost:5000/swagger` when backend runs in Development

2. **Database**
   - Connection string from `docker-compose` uses `Data Source=/app/data/users.db`
   - `Program.cs` ensures SQLite database is created when the app starts

3. **Docker workflow**
   - Build both services via `docker-compose up --build`
   - Backend maps host port 5000 to container 8080 with SSL/development overrides from `launchSettings.json`
   - Frontend uses Nginx, expects `REACT_APP_API_URL` to point to `http://localhost:5000/api`

4. **Testing & QA**
   - Run `dotnet test` in `UserDirectory.Tests` to validate controller logic
   - ESLint (`npm run lint`) validates frontend TypeScript, plus Vite build ensures bundler health

5. **CI/CD mindset**
   - Focus on incremental commits per feature
   - Preserve clean dependency tree listed in `UserDirectory.Api.csproj` and `frontend/package.json`
   - Maintain Docker parity with local environment by mirroring ports and environment variables in compose manifests

## Technology Stack & Tooling

- Backend: ASP.NET Core 8, EF Core 8, SQLite, Swashbuckle, Microsoft.Identity.Web, JWT Bearer
- Frontend: React 19.2, TypeScript 5.9, Vite 7.2, React Router DOM 7.12, Axios 1.13
- Dev tooling: Docker, Docker Compose, ESLint (with TypeScript ESLint + React Hooks), xUnit, Moq, EF Core InMemory
- CI-ready: dotnet CLI, npm scripts (`dev`, `build`, `lint`, `preview`)

- Backend API: `http://localhost:5000/api`
- Frontend UI: `http://localhost:3000`
- Swagger docs: `http://localhost:5000/swagger`

## Notes

- Maintain `.env` parity by mirroring `docker-compose` environment values when running locally
- Ensure Docker volume `data` persists SQLite data across container restarts
- Unit tests and linting should run before merging features


