# Original User Request

## Initial Request — 2026-07-16T00:24:11Z

Build a complete MVP skeleton for GetiDone, an AI-powered freelance execution platform. The skeleton must cover the core pathways across the entire system architecture (Auth, Profiles, Jobs, Matching, Messaging, Escrow/Payments, QA/QC).

Working directory: c:/Users/barns/OneDrive/Desktop/GetiDone
Integrity mode: development

## Requirements

### R1. Frontend Application
A Next.js 15 web application functioning as the portal for Clients and Freelancers. It must include the routing structure for Authentication, Dashboards, Job Posting, Job Browsing, and Messaging. Use TailwindCSS and Shadcn UI for styling. Ensure the architecture follows a strictly modular, feature-based folder structure (separating components, state, and logic by domain rather than globally) so that features can be updated independently.

### R2. Backend Application
A NestJS backend structured with strict modularity (using distinct NestJS `@Module`s for User, Job, Matching, Messaging, and Payment domains) to ensure loose coupling. External APIs (OpenAI, Paystack) should be abstracted behind mock implementations for this initial skeleton.

### R3. Database Layer
A PostgreSQL database schema configured via Prisma ORM that models the core entities: Users, Skills, Jobs, Applications, Projects, Messages, Deliverables, Payments, and Reviews.

## Acceptance Criteria

### System Verification
- [ ] Programmatic: The Next.js frontend compiles successfully without type errors (`npm run build`).
- [ ] Programmatic: The NestJS backend compiles successfully without type errors (`npm run build`).
- [ ] Programmatic: The Prisma schema is structurally valid (`npx prisma validate`).
- [ ] Execution: The backend has basic mock endpoints that return structured JSON for the core services defined in R2.
- [ ] Structural: The codebase organization strictly adheres to the requested feature-based modularity in both the frontend and backend directories.
