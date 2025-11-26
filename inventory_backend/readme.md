
# Backend — Inventory E‑Commerce (Django + PostgreSQL)

Short, actionable README to run and maintain the Django backend and the PostgreSQL database for this project.

## Overview
This backend is a Django REST API that serves inventory and e‑commerce endpoints consumed by the frontend. It uses PostgreSQL for persistence and Django REST Framework for APIs.

## Prerequisites
- Python 3.10+ (recommend latest 3.x)
- Node/npm only for frontend (not required here)
- PostgreSQL server (local or remote)
- Git
- Windows PowerShell (commands below use PowerShell)



## Environment (.env)
Create `.env` in the backend root with these variables (example):
```env
DEBUG=False
SECRET_KEY=replace-with-a-secure-key
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1
DATABASE_URL=postgres://dbuser:dbpass@localhost:5432/inventory_db
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

The project expects a `DATABASE_URL` (standard DSN). If using Django-environ or dj-database-url adjust accordingly.

## Setup (Windows PowerShell)
1. Create and activate virtualenv
```powershell
cd ]project location
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Install dependencies
```powershell
pip install -r requirements.txt
```

3. Configure `.env` (see example above).

4. Create PostgreSQL DB & user (example using psql)
```powershell
# open psql or run these as a DB admin
psql -U postgres
CREATE DATABASE inventory_db;
CREATE USER dbuser WITH PASSWORD "";
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO dbuser;
\q
```

5. Run migrations and create superuser
```powershell
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

6. Run dev server
```powershell
python manage.py runserver 0.0.0.0:8000
# API available at http://localhost:8000/api/ (or configured root)
```

## Tailored commands
- Run tests:
```powershell
python manage.py test
```
- Run linter (if configured):
```powershell
# example
flake8
```
- Collect static (production):
```powershell
python manage.py collectstatic --noinput
```

## Database backup & restore (Postgres)
- Backup:
```powershell
pg_dump -U dbuser -h localhost -F c -b -v -f "inventory_db.backup" inventory_db
```
- Restore:
```powershell
pg_restore -U dbuser -h localhost -d inventory_db -v "inventory_db.backup"
```

## Common issues & troubleshooting
- "OperationalError: could not connect to server": verify PostgreSQL is running and `DATABASE_URL` credentials are correct.
- Missing env vars: confirm `.env` exists and is loaded by settings (check settings.py).
- CORS errors from frontend: add frontend origin (e.g. `http://localhost:5173`) to `CORS_ALLOWED_ORIGINS` or `DJANGO_ALLOWED_HOSTS`.

## Deployment notes
- Use environment variables to set DEBUG=False and SECRET_KEY in production.
- Use Gunicorn / Daphne + Nginx for production; ensure static/media served via cloud storage or CDN.
- Add healthchecks and migrations-run step in deployment pipeline.

## API (example endpoints)
Update these to reflect actual routes in the project.
- GET /api/products/ — list products
- GET /api/products/{id}/ — product details
- POST /api/products/ — create product
- PUT /api/products/{id}/ — update product
- DELETE /api/products/{id}/ — delete product
- POST /api/auth/login/ — login
- POST /api/auth/register/ — register

## Connecting the frontend
Set frontend to call backend API at:
- Development: `http://localhost:8000`
- Ensure CORS is configured to allow the frontend origin (see `.env` example).

