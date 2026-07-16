# GetiDone — Database Setup Guide

## Prerequisites

Make sure you have **PostgreSQL** installed and running locally.

## 1. Create the Database

Open a PostgreSQL shell (psql) and run:

```sql
CREATE DATABASE getidone;
```

Or using the command line:
```bash
createdb getidone
```

## 2. Update Your Credentials (if needed)

Open `backend/.env` and update the connection string if your PostgreSQL
username or password differs from the defaults:

```
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/getidone?schema=public"
```

## 3. Run the Migration

From the `backend/` directory:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables (Users, Skills, Jobs, Applications, Projects, Messages, Conversations, Deliverables, Payments, Reviews)
- Generate the Prisma Client

## 4. (Optional) Seed the Database

```bash
npx prisma db seed
```

*(A seed file will be added in a future step.)*

## 5. Start Both Servers

**Terminal 1 — Backend (port 3001):**
```bash
cd backend
npm run start:dev
```

**Terminal 2 — Frontend (port 3000):**
```bash
cd frontend
npm run dev
```

Then open: http://localhost:3000

## Prisma Studio (Database Browser)

To visually browse your database:
```bash
cd backend
npx prisma studio
```

Opens at: http://localhost:5555
