# Project: GetiDone MVP Skeleton

## Architecture
GetiDone is an AI-powered freelance execution platform. The MVP skeleton provides a fully modular Next.js 15 frontend, NestJS backend, and Prisma/PostgreSQL database schema.

### Core Modules/Domains
1. **User (Auth, Profile, KYC)**: User accounts, profile details, dynamic skill tags, KYC verification.
2. **Job (Marketplace, Escrow, Milestones)**: Job postings, job application, milestones, progress tracking.
3. **Matching (AI & Done Score)**: AI matchmaking recommendations, Done Score calculations (Review, Completion, Timeliness, QA/QC, Trust, Engagement).
4. **Messaging**: Real-time communication and chat messages.
5. **Payment (Escrow & Rewards)**: Escrow funding and release, client rewards, commission calculations.

## Code Layout
```
/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Prisma PostgreSQL database schema
│   ├── src/
│   │   ├── app.module.ts         # Main App Module imports all domain modules
│   │   ├── main.ts               # App entrypoint
│   │   ├── user/                 # User domain module
│   │   │   ├── user.module.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.service.ts
│   │   ├── job/                  # Job domain module
│   │   │   ├── job.module.ts
│   │   │   ├── job.controller.ts
│   │   │   └── job.service.ts
│   │   ├── matching/             # Matching & Done Score module
│   │   │   ├── matching.module.ts
│   │   │   ├── matching.controller.ts
│   │   │   └── matching.service.ts
│   │   ├── messaging/            # Messaging domain module
│   │   │   ├── messaging.module.ts
│   │   │   ├── messaging.controller.ts
│   │   │   └── messaging.service.ts
│   │   └── payment/              # Payment domain module
│   │       ├── payment.module.ts
│   │       ├── payment.controller.ts
│   │       └── payment.service.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js 15 App router structure
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── auth/             # Routing for Authentication
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/        # Dashboards
│   │   │   │   ├── client/
│   │   │   │   ├── freelancer/
│   │   │   │   ├── admin/
│   │   │   │   └── qa/
│   │   │   ├── jobs/             # Job Posting & Job Browsing
│   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   └── [id]/
│   │   │   └── messages/         # Messaging view
│   │   └── features/             # Strictly modular feature-based folder structure
│   │       ├── auth/
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   └── services/
│   │       ├── dashboard/
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   └── services/
│   │       ├── jobs/
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   └── services/
│   │       └── messaging/
│   │           ├── components/
│   │           ├── hooks/
│   │           └── services/
│   ├── package.json
│   └── tailwind.config.ts
└── .agents/                      # Coordination & metadata metadata folder
```

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Track | Design and establish the E2E testing infra and 71 test cases | None | DONE ✅ |
| 2 | DB Layer | Design & validate PostgreSQL schema via Prisma ORM | None | DONE ✅ |
| 3 | Backend Skeleton | NestJS setup with 5 modular domains, Socket.io WebSockets Gateway & QA Test Gate Telemetry | DB Layer | DONE ✅ |
| 4 | Frontend Skeleton | Next.js 15 skeleton with 25+ SampleAssets pages, light/dark theme, loading transitions | None | DONE ✅ |
| 5 | Integration & E2E Verification | Connect UI to REST APIs, WebSockets, & Playwright 100% test gate auto-escrow release | Backend, Frontend, Testing Track | DONE ✅ |
| 6 | Adversarial Testing & Deployment | 71/71 E2E tests passed, Docker containerization, Security Audit & Cloud deployment | Integration | DONE ✅ |

## Interface Contracts

### NestJS Backend REST Endpoints
- **User Module**:
  - `POST /user/register` -> Returns registered user mock details
  - `POST /user/login` -> Returns JWT mock token
  - `GET /user/profile/:id` -> Returns mock profile data + skills + dynamic status
- **Job Module**:
  - `POST /job` -> Create job post mock
  - `GET /job` -> List job posts mock
  - `POST /job/:id/apply` -> Submit application mock
- **Matching Module**:
  - `GET /matching/recommend/:jobId` -> Returns list of recommended freelancers + match %
  - `GET /matching/donescore/:userId` -> Returns calculated Done Score (Review, Completion, etc.)
- **Messaging Module**:
  - `GET /messaging/conversations` -> List conversations
  - `POST /messaging/send` -> Send message mock
- **Payment Module**:
  - `POST /payment/escrow/fund` -> Initiate escrow holding mock
  - `POST /payment/escrow/release` -> Release payment mock
