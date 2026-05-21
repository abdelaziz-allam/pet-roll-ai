# PET Roll - Pet Health & Social Platform

A comprehensive pet management platform with a mobile app for pet owners, a landing page for marketing, and a full-featured admin portal for platform management.

## Architecture

```
monorepo/
  backend/    - Fastify API server (Node.js + TypeScript)
  admin/      - Admin portal (React + Ant Design + Vite)
  landing/    - Marketing landing page (React + Vite)
  app/        - Mobile app (Flutter + Dart + Riverpod)
  firebase/   - Firebase configuration & rules
  shared/     - Shared types and utilities
```

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- npm or yarn
- Flutter SDK (for mobile app)

### 1. Backend API

```bash
cd monorepo/backend
npm install
cp .env.example .env   # Uses in-memory store by default
npm run dev
```

**Runs on:** http://localhost:3000

### 2. Admin Portal

```bash
cd monorepo/admin
npm install
npm run dev
```

**Runs on:** http://localhost:4173

### 3. Landing Page

```bash
cd monorepo/landing
npm install
npm run dev
```

**Runs on:** http://localhost:4174

### 4. Mobile App (Flutter)

```bash
cd monorepo/app
flutter pub get
flutter run
```

---

## Access URLs (Local Development)

| Service        | URL                          | Description                       |
|----------------|------------------------------|-----------------------------------|
| Backend API    | http://localhost:3000         | Fastify REST API                  |
| Swagger Docs   | http://localhost:3000/docs    | Interactive API docs (OpenAPI 3.0)|
| Admin Portal   | http://localhost:4173         | Platform admin dashboard          |
| Landing Page   | http://localhost:4174         | Marketing / public-facing website |
| API Health     | http://localhost:3000/health  | Health check endpoint             |
| OpenAPI JSON   | http://localhost:3000/docs/json | Raw OpenAPI spec                |

---

## Admin Portal Login

On first run, seed the super admin account:

```bash
curl -X POST http://localhost:3000/api/v1/admin-auth/seed
```

Then login at http://localhost:4173 with:

| Field    | Value                |
|----------|----------------------|
| Email    | admin@petroll.com    |
| Password | admin123456          |

---

## User Types & Roles

### Admin Portal Users (admin_users collection)

These are staff members who access the admin portal at http://localhost:4173.

| Role          | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| super_admin   | Full platform access. Can manage all admin users, permissions, and settings. |
| admin         | Can manage app users, pets, verifications, and view analytics.               |
| moderator     | Can moderate content (mating listings, reported profiles) and view data.     |
| viewer        | Read-only access to dashboard and reports.                                   |

**Admin Portal Pages & Permissions:**

| Page          | Available Actions                              |
|---------------|------------------------------------------------|
| Dashboard     | view                                           |
| App Users     | view, create, edit, ban, delete, export         |
| Pets          | view, edit, delete (includes ban/unban)         |
| Verification  | view, approve, reject                          |
| Mating        | view, edit, delete, moderate                    |
| Notifications | view, send, delete                             |
| Analytics     | view, export                                   |
| Admin Users   | view, create, edit, delete, manage_permissions  |
| Settings      | view, edit                                     |

### Mobile App Users (users collection)

These are pet owners who use the Flutter mobile app. They authenticate via Firebase Auth (Google, Apple, Phone OTP) - no passwords are managed by the admin.

| Role      | Description                                                             |
|-----------|-------------------------------------------------------------------------|
| user      | Standard app user - can manage their own pets and records               |
| moderator | Can moderate mating listings and community content                      |
| admin     | Full app-level access - can manage all users and content within the app |

---

## Pet Categories

The platform supports the following pet species:

- Dog
- Cat
- Bird
- Horse
- Rabbit
- Fish
- Reptile
- Hamster
- Other

Categories are stored in the database (`pet_categories` collection) and can be managed via the admin portal or API. New species can be added dynamically without code changes.

---

## Key Features

### Admin Portal
- **Dashboard**: Overview stats, pet analytics (species/gender/country charts), growth indicators, filterable by Country/City/Pet Category
- **Pet Registry**: Full pet management with filters (species, gender, status, country, city), ban/unban with reason
- **User Management**: Create, edit, assign roles, ban/unban app users
- **Pet Categories**: Add, edit, delete pet species/types (DB-driven, not hardcoded)
- **Verification**: Review and approve/reject breeder verification requests with rejection reasons, submission history timeline
- **Mating Marketplace**: Match cards with pet photos (male/female pairing), breeder rankings with podium, stats dashboard (active listings, match rate, views), species filter
- **Settings Management**: Fully editable platform settings (General, Notifications, Security) persisted to database and reflected system-wide
- **Wedding Card Emails**: Automatic romantic email sent to both pet parents when a mating match is confirmed, with manual resend option from admin
- **Admin Users**: Manage portal staff with granular per-page permissions

### Mobile App
- Pet profile management (photos, health records, location)
- Mating marketplace: browse listings, send requests, view match cards with pet pairing visuals
- Breeder rankings with podium and success rates
- Breeder verification: submit, track history, resubmit after rejection
- Chat between pet owners
- Vaccination tracking
- Pregnancy tracking
- Push notifications

### Backend
- Fastify with TypeScript
- Firebase Firestore (production) / In-memory store (development)
- Google Cloud Storage for pet photo uploads
- JWT authentication for admin, Firebase Auth for mobile users
- Rate limiting, CORS, Helmet security headers
- Nodemailer email service with HTML wedding card templates

---

## API Endpoints (Admin)

Base: `/api/v1`

| Method | Endpoint                                    | Description                                   |
|--------|---------------------------------------------|-----------------------------------------------|
| POST   | /admin-auth/login                           | Admin login                                   |
| POST   | /admin-auth/seed                            | Seed super admin (dev only)                   |
| GET    | /admin-auth/me                              | Get current admin profile                     |
| GET    | /admin/stats                                | Platform statistics                           |
| GET    | /admin/users                                | List app users                                |
| POST   | /admin/users                                | Create app user                               |
| PUT    | /admin/users/:id                            | Update app user                               |
| PUT    | /admin/users/:id/role                       | Change user role                              |
| PUT    | /admin/users/:id/ban                        | Ban user                                      |
| PUT    | /admin/users/:id/unban                      | Unban user                                    |
| GET    | /admin/pets                                 | List pets (filters: species, status, country, city) |
| GET    | /admin/pets/:id                             | Get pet details                               |
| PUT    | /admin/pets/:id/ban                         | Ban pet (with reason)                         |
| PUT    | /admin/pets/:id/unban                       | Unban pet                                     |
| GET    | /admin/categories                           | List pet categories                           |
| POST   | /admin/categories                           | Create pet category                           |
| PUT    | /admin/categories/:id                       | Update pet category                           |
| DELETE | /admin/categories/:id                       | Delete pet category                           |
| POST   | /admin/categories/seed                      | Seed default categories (9 species)           |
| GET    | /admin/verifications                        | List verification requests                    |
| PUT    | /admin/verifications/:id                    | Approve/reject verification                   |
| GET    | /admin/settings                             | Get platform settings                         |
| PUT    | /admin/settings/:section                    | Update settings section (general/notifications/security) |
| GET    | /admin/mating/matches                       | List mating matches                           |
| POST   | /admin/mating/matches/:id/wedding-card      | Resend wedding card email for a match         |
| GET    | /admin/mating/matches/:id/wedding-card-preview | Get wedding card HTML preview              |
| GET    | /admin/locations/countries                  | List all countries                            |
| GET    | /admin/locations/cities?country=X           | Get cities for a country                      |
| POST   | /admin/locations/seed                       | Seed 195 countries with cities                |
| POST   | /admin/seed-data                            | Seed test pets (dev only)                     |
| POST   | /admin/seed-mating                          | Seed mating listings & matches (dev only)     |
| POST   | /admin/seed-verifications                   | Seed verification requests (dev only)         |

---

## Environment Variables

The backend uses these environment variables (see `.env`):

| Variable                      | Description                          | Default                                    |
|-------------------------------|--------------------------------------|--------------------------------------------|
| PORT                          | Server port                          | 3000                                       |
| NODE_ENV                      | Environment                          | development                                |
| USE_MEMORY_STORE              | Use in-memory Firestore mock         | true                                       |
| JWT_SECRET                    | Secret for JWT signing               | petroll-local-dev-secret-key-min16chars     |
| CORS_ORIGINS                  | Allowed origins (comma-separated)    | http://localhost:4173,http://localhost:4174 |
| FIREBASE_PROJECT_ID           | Firebase project ID                  | -                                          |
| GCS_BUCKET                    | Google Cloud Storage bucket          | -                                          |
| GOOGLE_APPLICATION_CREDENTIALS| Path to GCP service account JSON     | -                                          |
| SMTP_HOST                     | SMTP server hostname                 | smtp.ethereal.email                        |
| SMTP_PORT                     | SMTP server port                     | 587                                        |
| SMTP_USER                     | SMTP username                        | -                                          |
| SMTP_PASS                     | SMTP password                        | -                                          |
| SMTP_FROM                     | Email sender address                 | noreply@petroll.com                        |

---

## API Documentation (Swagger)

The backend exposes a full OpenAPI 3.0 spec with interactive Swagger UI:

- **Swagger UI**: http://localhost:3000/docs
- **OpenAPI JSON**: http://localhost:3000/docs/json

All endpoints require Bearer JWT authentication (except `/health` and `/admin-auth/login`).
To authorize in Swagger UI, click the **Authorize** button and enter your JWT token.

---

## Seed Data (Development)

When running with `USE_MEMORY_STORE=true`, the database starts empty on each server restart. Use the seed endpoints to populate development data. All seed endpoints require admin JWT authentication (except `/admin-auth/seed`).

### Seed Endpoints & Recommended Order

Run these in order after starting the backend:

| # | Endpoint                           | What it creates                                                |
|---|-------------------------------------|----------------------------------------------------------------|
| 1 | `POST /api/v1/admin-auth/seed`     | Super admin account (admin@petroll.com / admin123456)           |
| 2 | `POST /api/v1/admin/locations/seed` | 195 countries with major cities (global coverage)              |
| 3 | `POST /api/v1/admin/categories/seed` | 9 default pet categories (Dog, Cat, Bird, Horse, etc.)       |
| 4 | `POST /api/v1/admin/seed-data`     | Sample app users + pets with photos, locations, and health data |
| 5 | `POST /api/v1/admin/seed-mating`   | Mating listings, requests (pending/accepted/rejected), pet records with photos |
| 6 | `POST /api/v1/admin/seed-verifications` | Breeder verification requests in various states (pending, approved, rejected) |

**Quick seed script (after login):**

```bash
# 1. Seed admin (no auth needed)
curl -X POST http://localhost:3000/api/v1/admin-auth/seed

# 2. Login to get token
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/admin-auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@petroll.com","password":"admin123456"}' | jq -r '.accessToken')

# 3. Seed all data
curl -X POST http://localhost:3000/api/v1/admin/locations/seed -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:3000/api/v1/admin/categories/seed -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:3000/api/v1/admin/seed-data -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:3000/api/v1/admin/seed-mating -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:3000/api/v1/admin/seed-verifications -H "Authorization: Bearer $TOKEN"
```

### Seed Views vs Production Views

| Aspect            | Seed / Development                                | Production                                    |
|-------------------|---------------------------------------------------|-----------------------------------------------|
| **Data source**   | Created by seed endpoints with fake/sample data   | Real user-generated data from app interactions |
| **Users**         | Pre-built users (John Doe, Sarah Smith, etc.)     | Real pet owners who signed up via the app      |
| **Pets**          | Sample pets with placeholder photos (Picsum URLs) | Pets added by owners with real uploaded photos |
| **Mating matches**| Pre-configured matches in all states (pending, accepted, rejected) | Matches created organically through the mating marketplace flow |
| **Verifications** | Fake documents and pre-set statuses               | Real breeder documents submitted for review    |
| **Persistence**   | Resets on server restart (in-memory mode)         | Persisted in Firestore                        |
| **Email behavior**| Logged to console (no actual email sent)          | Sent via configured SMTP server               |
| **Settings**      | Defaults loaded from code                         | Persisted in `app_settings` Firestore collection |

**Key difference:** Seed data lets you immediately see all admin portal features populated with realistic-looking data. In production, pages start empty and fill as real users interact with the platform. The UI is identical — only the data source differs.

---

## Wedding Card Email

When a mating request is accepted (either by the listing owner responding, or by admin action), a "wedding card" email is automatically sent to both pet parents. The email includes:

- Pet photos in circular frames with gender-colored borders
- A heart connector between the paired pets
- Match details (date, location, species)
- Congratulations message
- Link to view match details in the app

**In development** (without SMTP configured): emails are logged to the console instead of sent.

**Admin manual trigger**: Admins can resend the wedding card from the Mating Matches page by clicking the "Send Wedding Card" button on any accepted match.

---

## Development Notes

- **In-memory mode**: When `USE_MEMORY_STORE=true`, all data is stored in memory and resets on server restart. Use the seed endpoints to recreate data after restart.
- **Admin vs App auth**: The admin portal uses its own JWT-based authentication (email/password). Mobile app users authenticate through Firebase Auth (Google, Apple, Phone OTP).
- **Pet ban system**: When a pet is banned, the `banReason` is stored and displayed to the pet owner in the mobile app so they understand why their pet profile was hidden.
- **Settings persistence**: Platform settings (maintenance mode, rate limits, token expiry, file upload limits) are stored in the `app_settings` Firestore collection as a single `global` document. Changes via the admin Settings page take effect immediately.
- **Email in dev mode**: When `SMTP_USER` is not set and `NODE_ENV=development`, the email service logs what would be sent without attempting SMTP delivery.
