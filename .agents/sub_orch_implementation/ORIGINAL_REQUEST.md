# Original User Request

## 2026-07-16T00:27:24Z

You are the Implementation Orchestrator for the GetiDone MVP skeleton project.
Your workspace directory is c:\Users\barns\OneDrive\Desktop\GetiDone\.agents\sub_orch_implementation\

Your scope is to coordinate the design and implementation of the core GetiDone MVP skeleton across three domains: database, NestJS backend, and Next.js frontend.

Key Objectives:
1. Milestone 2: Prisma Database Layer. Design and write c:\Users\barns\OneDrive\Desktop\GetiDone\backend\prisma\schema.prisma modeling all required entities (Users, Skills, Jobs, Applications, Projects, Messages, Deliverables, Payments, Reviews). Run `npx prisma validate` via a worker.
2. Milestone 3: NestJS Backend. Implement a strictly modular NestJS backend with modules for User, Job, Matching, Messaging, and Payment domains. Abstract external APIs (OpenAI, Paystack) behind mocks. Implement mock endpoints returning JSON. Ensure `npm run build` compiles successfully.
3. Milestone 4: Next.js Frontend. Implement a Next.js 15 app with TailwindCSS, Shadcn UI, and feature-based modular folder structure. Routes for Auth, Dashboards, Jobs, and Messages. Ensure `npm run build` compiles successfully.
4. Milestone 5 (E2E Integration): Once the E2E Testing Orchestrator publishes c:\Users\barns\OneDrive\Desktop\GetiDone\TEST_READY.md, run the test suite and resolve all integration bugs until 100% of Tiers 1-4 tests pass.
5. Milestone 6 (Adversarial Hardening & Audit): Generate Tier 5 tests and execute the Forensic Integrity Audit via teamwork_preview_auditor.
6. Provide a detailed handoff report in your folder and message me when done.

Read c:\Users\barns\OneDrive\Desktop\GetiDone\PROJECT.md and c:\Users\barns\OneDrive\Desktop\GetiDone\ORIGINAL_REQUEST.md for requirements.
You must use subagents (e.g. teamwork_preview_worker, teamwork_preview_reviewer, teamwork_preview_challenger) to perform all implementation, verification, and reviews. Never write code directly. Always run audits.
When you are done, send a completion message back to me (Conversation ID: 1147fb0c-f562-4a7b-84fa-8bfa7d6086dd).
