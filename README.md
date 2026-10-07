# Northstar Health — Hospital Information Portal

A working college demonstration portal for fictional hospital data. Browser pages call a server API; the API enforces roles and persists changes in a relational SQLite database. The included seed has 20 fictional patients, 10 doctors, 8 departments, 30 appointments, 10+ records, prescriptions and lab orders, inpatient stays, invoices, medicines, and notifications.

## Run it

Requirements: Node.js 22.5 or newer. The built-in `node:sqlite` module is used, so no package installation is needed.

```sh
npm run dev
```

Open http://localhost:3000. The first server start creates `data/hospital.sqlite`, applies [schema.sql](src/schema.sql), and inserts demo data. Changes persist between reloads and server restarts. To reset the demo, stop the server and remove `data/hospital.sqlite` (and its `-wal`/`-shm` files if present), then restart.

All demo accounts use `Hospital123!`:

| Role | Email |
|---|---|
| Admin | `admin@hospital.demo` |
| Doctor | `doctor@hospital.demo` |
| Nurse | `nurse@hospital.demo` |
| Receptionist | `receptionist@hospital.demo` |
| Lab staff | `lab_staff@hospital.demo` |
| Pharmacist | `pharmacist@hospital.demo` |
| Accountant | `accountant@hospital.demo` |
| Patient | `patient@hospital.demo` |

## What works

- Role-aware login, logout, remember-me sessions, protected APIs, user creation/deactivation, and profile/password settings. Passwords use salted scrypt hashes; session cookies are HttpOnly and SameSite.
- Patient, doctor, department, appointment, medical record, prescription, lab, admission, invoice, inventory, staff, and notification records use API-backed lists, search, status filters, pagination, detail views, forms, and supported role-specific actions.
- Patient detail tabs load linked clinical and billing records. Appointments have table and month-calendar views. Global search returns matching records the signed-in role may access.
- Business rules prevent overlapping doctor appointments, prevent an active bed from being double-assigned, retain cancelled appointments and archived patients, create notifications when lab results are completed, recalculate invoice balances from payment entries, and record stock-in/dispense transactions with stock checks.
- The schema defines foreign keys, indexes, unique appointment and bed constraints, and normalized tables for vital signs, prescription items, lab results, payments, and inventory transactions. Important API actions are written to the audit log.

## Roles

Admin can manage all modules and accounts. Doctors manage clinical notes, prescriptions, and lab orders. Nurses manage admissions. Receptionists manage patient intake, scheduling, admissions, and invoices. Lab staff process results. Pharmacists manage stock and dispense. Accountants manage invoices and record payments. Patients can see their own patient-linked records and update their own notifications. Authorization is checked in the API, not only in the sidebar.

## API overview

The built-in HTTP server in `server.js` serves `public/` and the `/api` endpoints. Endpoints include `/api/login`, `/api/logout`, `/api/me`, `/api/dashboard`, `/api/search`, `/api/settings`, `/api/payments`, and REST-style resource routes such as `/api/patients`, `/api/appointments`, `/api/medical-records`, and `/api/laboratory`. Collections accept `q`, `status`, `offset`, and `limit` parameters. Errors return JSON with an HTTP status suitable for the UI to display.

## Checks

```sh
npm test
npm run lint
npm run build
```

The integration test covers authentication, patient creation and isolation, appointment conflicts, role authorization, clinical record and prescription creation, lab completion notifications, partial and final payments, stock deductions and transaction history, and user account creation/deactivation. `lint` and `build` run Node syntax checks; this project does not include a TypeScript compiler or bundler.

## Structure

```text
server.js             HTTP API, authentication, validation, authorization, workflows
src/schema.sql        SQLite relational schema and constraints
src/store.js          Transactional persistence and normalized row projection
src/seed.js           Fictional seed dataset and hashed demo users
src/permissions.js    Central role access matrix
public/index.html     Application entry
public/app.js         Browser UI and API client
public/styles.css     Responsive visual system
test/api.test.js      API integration workflow
```

## Screenshots

The dashboard and modules render from live database records. Capture screenshots from the local demo for a project submission after starting the server.

## Scope and deployment notes

This implementation prioritizes a complete runnable demo in the available environment, which has Node.js but no PostgreSQL service, Docker, or PostgreSQL client. It therefore uses SQLite and a dependency-free Node server instead of the requested Next.js/PostgreSQL stack. It is suitable for a fictional college demo, not real patient data or production clinical use. A production deployment would need PostgreSQL migrations and hosting, a durable shared session store, CSRF/rate limiting, backups, formal privacy/security review, and full browser/device QA. The included `build` check is not a production bundle build.
