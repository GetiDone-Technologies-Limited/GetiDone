# 🚀 GetiDone Platform — Next-Gen AI Freelance Execution Engine

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Multi--Service_Active-black?logo=vercel)](https://vercel.com)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/GetiDone-Technologies-Limited/GetiDone)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🏛️ Ecosystem Architecture Overview

- **Frontend Service**: Next.js 15 App Router (`/frontend`) with Tailwind CSS & Sora/Manrope Design System.
- **Backend Service**: NestJS Framework (`/backend`) with Prisma ORM & Socket.io WebSockets Gateway.
- **Mobile Service**: React Native / Expo (`/mobile`) for iOS & Android cross-platform sync.
- **Multi-Service Engine**: Vercel `vercel.json` Monorepo Architecture with zero-CORS API rewrites and internal service bindings (`BACKEND_SERVICE_URL`).

---

## ⚡ Deployment & Vercel Multi-Service Setup

Vercel automatically builds both services from `vercel.json`:
- **Public API Rewrite**: `/api/(.*)` ➔ `backend` service
- **Public App Rewrite**: `/(.*)` ➔ `frontend` service

---

*Last Fresh Deployment Trigger*: `2026-10-08 21:42 UTC`
