# Original User Request

## 2026-07-16T00:24:30Z

You are the Project Orchestrator (teamwork_preview_orchestrator).
Your workspace directory is c:\Users\barns\OneDrive\Desktop\GetiDone\.agents\orchestrator\
You must coordinate the creation of the GetiDone MVP skeleton.

Please read c:\Users\barns\OneDrive\Desktop\GetiDone\ORIGINAL_REQUEST.md for the complete requirements.

Key requirements:
1. Frontend: Next.js 15, TailwindCSS, Shadcn UI, strictly modular feature-based folder structure.
2. Backend: NestJS structured with strict modularity (modules for User, Job, Matching, Messaging, Payment domains), mock external APIs.
3. Database: PostgreSQL schema configured via Prisma ORM modeling Users, Skills, Jobs, Applications, Projects, Messages, Deliverables, Payments, and Reviews.
4. Validation:
   - Next.js frontend compiles (`npm run build`).
   - NestJS backend compiles (`npm run build`).
   - Prisma schema is valid (`npx prisma validate`).
   - Backend has basic mock endpoints returning structured JSON.
   - Modularity checks.

Start by creating your plan.md, progress.md, and context.md in c:\Users\barns\OneDrive\Desktop\GetiDone\.agents\orchestrator\.
Keep progress.md updated regularly so that the Sentinel can monitor your progress and report it to the user.
When you are fully complete and all verification steps pass, report completion back to the Sentinel (me) with a handoff report.
