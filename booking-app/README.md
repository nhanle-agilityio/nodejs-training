# Booking App

A REST API for a booking platform built with NestJS. Users browse available time slots, create bookings, and pay via Stripe. Admins manage slots and can act on behalf of users. Emails are sent at booking lifecycle events. Authentication is handled by Clerk.

## Targets

| # | Target | What is practiced |
|---|---|---|
| 1 | **Authentication** | Clerk JWT verification, webhook-based user sync, global auth guard |
| 2 | **Authorization** | CASL ability-based access control, ownership enforcement, resource enumeration prevention |
| 3 | **Distributed lock** | Redlock over Redis to prevent double-booking race conditions |
| 4 | **Queue** | BullMQ job queue for async email delivery, delayed jobs, retries with exponential backoff |
| 5 | **Payment** | Stripe Checkout Sessions, webhook processing, idempotency keys, refund flow |
| 6 | **Send email** | Transactional emails via Resend — confirmation, cancellation, 24h reminder |
| 7 | **Cron job** | Scheduled expiry of unpaid bookings using `@nestjs/schedule` |
| 8 | **Rate limiting** | Per-IP throttling with `@nestjs/throttler` backed by Redis |
| 9 | **Caching** | Redis slot-list cache with prefix-based invalidation on writes |

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | NestJS 11 (TypeScript) |
| Database | PostgreSQL 18 + TypeORM 0.3 |
| Auth | Clerk (JWT + Svix webhooks) |
| Authorization | CASL 6 (ability-based) |
| Cache | Redis 7 via ioredis |
| Distributed lock | Redlock |
| Job queue | BullMQ |
| Email | Resend SDK |
| Payments | Stripe (Checkout Sessions + webhooks) |
| Rate limiting | @nestjs/throttler with Redis storage |
| Validation | class-validator + class-transformer + Joi |
| API docs | Swagger (@nestjs/swagger) |
| Scheduling | @nestjs/schedule (cron) |
| Testing | Jest (unit) + Supertest (e2e) |

## Project Structure

```
src/
├── main.ts                          # Bootstrap: global pipe, prefix, interceptor, filter, Swagger
├── app.module.ts                    # Root module — wires all feature modules
│
├── auth/                            # Authentication
│   ├── auth.module.ts               # Registers ClerkAuthGuard + PoliciesGuard as global guards
│   ├── guards/
│   │   └── clerk-auth.guard.ts      # Verifies Clerk JWT, attaches User to request
│   └── webhooks/
│       └── clerk-webhook.controller.ts  # POST /webhooks/clerk — user lifecycle sync
│
├── bookings/                        # Booking domain
│   ├── booking.entity.ts            # Booking entity (status: PENDING → CONFIRMED → CANCELLED)
│   ├── bookings.controller.ts       # CRUD routes + cancel action
│   ├── bookings.service.ts          # Core logic: concurrency control, cancellation, expiry
│   ├── dto/
│   ├── email/                       # Email lifecycle sub-domain
│   │   ├── booking-lifecycle.service.ts     # Orchestrates confirm/cancel email flows
│   │   ├── booking-mail.service.ts          # Enqueues confirmation and cancellation jobs
│   │   ├── booking-email-queue.processor.ts # BullMQ worker (concurrency: 5)
│   │   ├── booking-reminder-queue.service.ts# Delayed reminder job management
│   │   ├── booking-reminder-send.service.ts # Processes reminder on fire
│   │   └── booking-email.templates.ts       # HTML email templates
│   └── schedulers/                  # Cron jobs
│       └── booking-expiry.scheduler.ts      # Auto-cancels unpaid PENDING bookings after 15 min
│
├── casl/                            # Authorization
│   ├── casl-ability.factory.ts      # Defines per-role ability rules (Admin: manage all; User: own resources)
│   ├── policies.decorator.ts        # @CheckPolicies() route decorator
│   └── policies.guard.ts            # Enforces CASL abilities on each request
│
├── common/                          # Shared infrastructure
│   ├── decorators/
│   │   ├── current-user.decorator.ts  # @CurrentUser() — extracts User from request
│   │   └── public.decorator.ts        # @Public() — bypasses ClerkAuthGuard
│   ├── dto/
│   │   ├── paginated-response.dto.ts  # Base paginated response shape
│   │   └── pagination-query.dto.ts    
│   ├── filters/
│   │   └── global-exception.filter.ts # Maps all exceptions to { statusCode, message, error }
│   ├── interceptors/
│   │   └── transform.interceptor.ts   # Wraps every response as { data: T }
│   └── pagination/
│       ├── resolve-pagination.ts      
│       └── map-paginated-items.ts     
│
├── config/
│   ├── configuration.ts             # AppConfig type + env loader
│   └── validation.ts                # Joi schema — validates all env vars at startup
│
├── database/
│   ├── database.module.ts           # TypeORM async setup via ConfigService
│   ├── data-source.ts               # CLI data source (used by migration:* scripts)
│   └── migrations/                  # TypeORM migration files (generated, never hand-written)
│
├── email-queue/                     # BullMQ queue registration
│   ├── email-queue.module.ts        # Registers the 'email' queue; sets up Bull Board UI
│   └── queue.constants.ts           # QUEUE_EMAIL token
│
├── health/
│   └── health.controller.ts         # GET /health — database + Redis health indicators
│
├── mail/
│   └── resend-mail.service.ts       # Resend SDK wrapper; noop mode for dev/test
│
├── payments/                        # Stripe payments
│   ├── payment.entity.ts            # Payment entity (status: SUCCEEDED / FAILED / REFUNDED)
│   ├── payments.controller.ts       # POST /api/bookings/:id/checkout
│   ├── payments.service.ts          # Checkout session, webhook processing, refunds
│   ├── stripe.service.ts            # Stripe SDK wrapper
│   ├── payment.util.ts              
│   └── webhooks/
│       └── stripe-webhook.controller.ts  # POST /webhooks/stripe — payment_intent.succeeded
│
├── redis/                           # Redis infrastructure (global module)
│   ├── redis.module.ts              # Provides REDIS_CLIENT (ioredis) + REDLOCK globally
│   ├── redis-cache.service.ts       # Generic JSON get / set / invalidate-by-prefix
│   └── redis.tokens.ts              # REDIS_CLIENT and REDLOCK injection tokens
│
├── slots/                           # Slot domain
│   ├── slot.entity.ts               # Slot entity (status: open / closed, soft-delete)
│   ├── slots.controller.ts          # CRUD routes (public reads, admin writes)
│   ├── slots.service.ts             # Business logic + cache invalidation on every write
│   ├── slots-cache.service.ts       # Typed Redis cache wrapper for the slot list
│   └── dto/
│
└── users/                           # User domain
    ├── user.entity.ts               
    ├── users.controller.ts          
    └── users.service.ts             
```


## Prerequisites

- Node.js 20+
- Docker + Docker Compose (for local infrastructure)
- A [Clerk](https://clerk.com) application
- A [Stripe](https://stripe.com) account
- A [Resend](https://resend.com) account (optional — `MAIL_MODE=noop` skips sending)

## Local Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp devenv/.env.example devenv/.env
```

Edit `devenv/.env` and fill in the required secrets:

| Variable | Description |
|---|---|
| `CLERK_SECRET_KEY` | Clerk backend secret key (`sk_test_...`) |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key (`pk_test_...`) |
| `CLERK_WEBHOOK_SECRET` | Svix signing secret for Clerk webhooks (`whsec_...`) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_CURRENCY` | ISO currency code (e.g. `usd`) |
| `STRIPE_SUCCESS_URL` | Redirect URL after successful Stripe payment |
| `STRIPE_CANCEL_URL` | Redirect URL after cancelled Stripe checkout |
| `RESEND_API_KEY` | Resend API key (leave as-is if using `MAIL_MODE=noop`) |
| `MAIL_FROM` | Sender address for transactional emails |
| `MAIL_MODE` | Set to `noop` to skip real email delivery (logs to console) |

Infrastructure variables (`DATABASE_*`, `REDIS_*`) are pre-filled to match the Docker Compose defaults and can be left unchanged for local development.

### 3. Start infrastructure

```bash
cd devenv
docker compose up -d postgres redis
```

This starts PostgreSQL (port 5433) and Redis (port 6379).

### 4. Run database migrations

```bash
npm run migration:run
```

### 5. Start the application

```bash
npm run start:dev
```

The API is available at `http://localhost:3000`. Swagger UI is at `http://localhost:3000/api/docs`.

---

### Run everything in Docker

To run the full stack (app + Postgres + Redis) in containers:

```bash
cd devenv
docker compose up
```

The app container maps `..` (project root) as a volume, so code changes are reflected immediately.

---

## Local Webhook Development

Both Clerk and Stripe push events to your application over HTTP. Since these services cannot reach `localhost` directly, you need a tunnel for Clerk and the Stripe CLI forwarder for Stripe.

### Clerk Webhooks

Clerk fires `user.created`, `user.updated`, and `user.deleted` events to keep the local `users` table in sync with Clerk's user directory.

**Setup**

1. Start the application on port 3000.
2. Install [ngrok](https://ngrok.com) and start a tunnel:

```bash
ngrok http 3000
```

3. Copy the generated HTTPS forwarding URL and open the **Clerk Dashboard → Configure → Webhooks → Add Endpoint**.
4. Set the endpoint URL to:

```
https://<ngrok-id>.ngrok-free.app/webhooks/clerk
```

5. Subscribe to these events: `user.created`, `user.updated`, `user.deleted`.
6. Copy the **Signing Secret** (`whsec_...`) shown for the endpoint and add it to `devenv/.env`:

```env
CLERK_WEBHOOK_SECRET=whsec_...
```

---

### Stripe Webhooks

Stripe fires `payment_intent.succeeded` after a payment completes, which the app uses to confirm bookings and trigger confirmation emails.

**Setup**

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and log in:

```bash
stripe login
```

2. Start the event forwarder:

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```

3. The CLI prints a webhook signing secret on startup:

```
Ready! Your webhook signing secret is whsec_... (^C to quit)
```

   Add it to `devenv/.env` and restart the application:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

4. Trigger a test event from a second terminal:

```bash
stripe trigger payment_intent.succeeded
```

   The app logs: `Stripe event payment_intent.succeeded id=<event-id>`.

---

---

## Environment Variables Reference

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `development` | Runtime environment |
| `PORT` | `3000` | HTTP port the app listens on |
| `DATABASE_HOST` | `localhost` | PostgreSQL host |
| `DATABASE_PORT` | `5433` | PostgreSQL port |
| `DATABASE_USERNAME` | `booking` | PostgreSQL user |
| `DATABASE_PASSWORD` | `booking` | PostgreSQL password |
| `DATABASE_NAME` | `booking` | PostgreSQL database name |
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `CLERK_SECRET_KEY` | — | Clerk backend secret key |
| `CLERK_WEBHOOK_SECRET` | — | Svix signing secret for Clerk webhook |
| `STRIPE_SECRET_KEY` | — | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | — | Stripe webhook signing secret |
| `STRIPE_SUCCESS_URL` | — | Post-payment success redirect URL |
| `STRIPE_CANCEL_URL` | — | Post-payment cancel redirect URL |
| `BULLMQ_PREFIX` | `booking` | BullMQ Redis key prefix |
| `MAIL_MODE` | `live` | `noop` = log only |
| `RESEND_API_KEY` | — | Resend API key |
| `MAIL_FROM` | — | Sender email address |
| `THROTTLE_TTL` | `60000` | Rate limit window in milliseconds |
| `THROTTLE_LIMIT` | `100` | Max requests per window per IP |
| `SLOTS_CACHE_TTL` | `300` | Redis TTL for the slots list cache (seconds) |

## API Overview

All endpoints use the global prefix `/api`. Webhook and health endpoints are excluded from this prefix.

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Database and Redis health check |
| `GET` | `/api/users/me` | User / Admin | Authenticated user's profile |
| `GET` | `/api/slots` | Public | List slots (paginated, cached) |
| `GET` | `/api/slots/:id` | Public | Get a single slot |
| `POST` | `/api/slots` | Admin | Create a slot |
| `PATCH` | `/api/slots/:id` | Admin | Update a slot |
| `DELETE` | `/api/slots/:id` | Admin | Soft-delete a slot |
| `POST` | `/api/bookings` | User / Admin | Create a booking |
| `GET` | `/api/bookings` | Admin | List all bookings (paginated) |
| `GET` | `/api/bookings/me` | User / Admin | List own bookings (paginated) |
| `GET` | `/api/bookings/:id` | Owner / Admin | Get a single booking |
| `PATCH` | `/api/bookings/:id/cancel` | Owner / Admin | Cancel a booking |
| `POST` | `/api/bookings/:id/checkout` | Owner / Admin | Create a Stripe Checkout session |
| `POST` | `/webhooks/stripe` | Public (sig-verified) | Stripe payment webhook |
| `POST` | `/webhooks/clerk` | Public (sig-verified) | Clerk user lifecycle webhook |

Authentication uses Clerk JWTs. Pass the token as `Authorization: Bearer <token>` on all authenticated routes.

Full interactive documentation is available at `/api/docs` (Swagger UI) when the app is running.

## Scripts

```bash
# Development
npm run start:dev          # Start in watch mode

# Database migrations
npm run migration:run      # Apply pending migrations (dev DB)
npm run migration:run:test # Apply pending migrations (test DB)
npm run migration:revert   # Revert last migration
npm run migration:show     # List applied / pending migrations

# Code quality
npm run lint               # Run ESLint with auto-fix
npm run format             # Run Prettier on src/ and test/

# Testing
npm test                   # Unit tests
npm run test:watch         # Unit tests in watch mode
npm run test:cov           # Unit tests with coverage report
npm run test:e2e           # End-to-end tests (requires running DB + Redis)
```

## Testing

### Unit tests

Unit tests live alongside their source files (`*.spec.ts`). They mock all external dependencies (database, Redis, Stripe, Resend) and run without any infrastructure.

```bash
npm test
```

### End-to-end tests

E2E tests live in `test/` and run against a real PostgreSQL and Redis instance.

```bash
# 1. Start infrastructure
cd devenv && docker compose up -d postgres redis && cd ..

# 2. Configure the test environment
cp devenv/.env.test.example devenv/.env.test
# Edit devenv/.env.test if needed (Clerk / Stripe test keys)

# 3. Apply migrations to the test database
npm run migration:run:test

# 4. Run e2e tests
npm run test:e2e
```

E2E tests run sequentially (`--runInBand`) and seed/clean their own data.
