# WaraChow Database Deployment

**PostgreSQL-backed schema, seed data, and SQL scenario tooling** for the WaraChow training project. This package spins up a containerized database, optional demo data, pgAdmin for exploration, and a Node.js query runner that runs the full scenario list against live data.

---

## Introduction

This repository area is a self-contained **database lifecycle** workspace: define the schema once, apply it on first container start, optionally fill tables with realistic mock data, then run the curated scenario suite to verify representative SQL. Use pgAdmin (or any SQL client) for one-off or exploratory queries.

---

## Key Features

| Area | What you get |
|------|----------------|
| **PostgreSQL 18** | Alpine-based image, persistent volume for data |
| **First-run schema** | `scripts/schema.sql` mounted into `docker-entrypoint-initdb.d` (runs only on empty data volume) |
| **pgAdmin 4** | Web UI with a starter server definition under `pgadmin/` |
| **Optional seeder** | Faker.js-driven data (`seeder/`), activated via Compose **profile** `seed` |
| **Query runner** | Runs all cases in `scenarios.json` (SQL under `queries/`) |

---

## Installation

### Prerequisites

- Docker and Docker Compose
- Node.js

### Steps

1. **Clone or open** this repository and `cd` into `database-deployment/`.

   ```bash
   git clone git@gitlab.asoft-python.com:nhan.le/nodejs-training.git
   git checkout feature/design_database_practice
   cd database-deployment
   ```

2. **Create environment file** (see [Environment configuration](#environment-configuration))

3. **Start core services** (PostgreSQL + pgAdmin):

   ```bash
   docker compose up -d
   ```

4. **Optional — seed demo data** using the Compose profile.
  
   ```bash
   docker compose --profile seed up -d
   ```

---

## Running the project

### pgAdmin

- Open **http://localhost:5050** (or your `PGADMIN_PORT`) in a browser.
- Sign in with `PGADMIN_EMAIL` and `PGADMIN_PASSWORD` from `.env`.

### Query runner

From `query-runner/`, `npm start` runs the cases in `scenarios.json` (core read-only checks for auth, catalog, cart, orders, payments, addresses, wishlist, loyalty, and promotions). Each case uses one file under `queries/`; extra SQL is not kept in `queries/` unless it is referenced.

```bash
cd query-runner
npm install
npm start
```

This prints labeled results and row counts; large result sets show a preview of the first rows. To run individual `.sql` files or ad hoc SQL, use [pgAdmin](#pgadmin).

---

## Environment configuration

Create `.env` next to `docker-compose.yml` (copy from `.env.example`).

Example fragment for local development:

```env
DB_USER=warachow
DB_PASSWORD=warachow_secret
DB_NAME=warachow_db
DB_PORT=5433
PGADMIN_EMAIL=admin@warachow.com
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050
```

---

## Folder structure

```text
database-deployment/
├── .env.example          # Template for secrets and ports (copy to .env)
├── docker-compose.yml    # Postgres, pgAdmin, optional seeder (profile: seed)
├── README.md             # This document
├── pgadmin/
│   └── servers.json      # Pre-registered server for pgAdmin (Docker network)
├── scripts/
│   └── schema.sql        # Executed on first DB init (empty volume)
├── seeder/               # Node Faker.js seeder
│   ├── package.json
│   └── src/
└── query-runner/         # Runs scenarios.json
    ├── package.json
    ├── run-scenarios.js  # Loads scenarios.json;
    ├── scenarios.json    # Ordered cases
    └── queries/          # SQL organized by domain
        ├── addresses/
        ├── cart/
        ├── catalog/
        ├── loyalty/
        ├── orders/
        ├── payments/
        ├── promotions/
        ├── user-management/
        └── wishlist/
```
