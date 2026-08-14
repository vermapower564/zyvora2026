# ZYVORA — ENTERPRISE ARCHITECTURE DESIGN SPECIFICATION (PHASE 1)

---

## 1. High-Level Architectural Pattern

Zyvora follows a strict layered enterprise architecture for Next.js App Router applications:

```
┌─────────────────────────────────────────────────────────────┐
│                       NEXT.JS UI                            │
│  React Server Components & Interactive Client Islands      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    API / SERVER ACTIONS                     │
│  App Router Handlers (`app/api/`) & Server Functions        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   ZOD INPUT VALIDATION                      │
│  Request payload parsing & type guards (`lib/validations.ts`)│
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   AUTHORIZATION & RBAC                      │
│  Role & permission checks (`lib/permissions.ts`)            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   BUSINESS SERVICES LAYER                   │
│  Domain business logic (`services/*.service.ts`)            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      PRISMA ORM                             │
│  Singleton ORM client & queries (`lib/prisma.ts`)           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   MYSQL DATABASE ENGINE                     │
│  Relational storage (`DATABASE_URL`)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Layout & Module Responsibilities

```
zyvora/
├── app/                  # Next.js App Router (Routes & Layouts)
│   ├── (marketplace)/    # Customer E-Commerce & Shop pages
│   ├── customer/         # Customer account, orders, addresses
│   ├── seller/           # Seller vendor dashboard, products, payouts
│   ├── admin/            # Marketplace administration & moderation
│   ├── dashboard/        # Enterprise OMS Executive Dashboard & Command Center
│   ├── employees/        # OMS Staff directory & HR controls
│   ├── attendance/       # OMS Attendance & Clock in/out
│   ├── daily-work/       # OMS Daily work updates & reviews
│   ├── projects/         # OMS Project management & progress
│   ├── clients/          # OMS Client CRM
│   ├── sales-pipeline/   # OMS Sales CRM Kanban pipeline
│   ├── finance/          # OMS Financial transaction ledger
│   ├── payroll/          # OMS Payroll disbursals
│   ├── leave/            # OMS Leave applications & approvals
│   ├── resignations/     # OMS Resignation workflows
│   ├── interns/          # OMS Intern student tracking
│   ├── developer-activity/# OMS Git commit telemetry
│   ├── seo/              # OMS Keyword rank tracking
│   ├── digital-marketing/# OMS Ad campaign ROAS
│   ├── design-assets/    # OMS Design asset library
│   ├── video-production/ # OMS Video production pipeline
│   ├── it-assets/        # OMS Hardware asset inventory
│   ├── documents/        # OMS PDF Document verification center
│   ├── admin/audit-logs/ # OMS Immutable security audit logs
│   └── settings/         # System settings & preferences
│
├── components/           # Reusable Component Hierarchy
│   ├── ui/               # Generic UI primitives (Button, Modal, Table, etc.)
│   ├── layout/           # Global AppShell, OMSSidebar, OMSTopbar, Header, Footer
│   └── product/          # Product domain cards, tables, filters, stats
│
├── lib/                  # System Utilities & Infrastructure
│   ├── prisma.ts         # Prisma ORM singleton client
│   ├── auth.ts           # Password hashing & session token handlers
│   ├── permissions.ts    # Centralized RBAC permission checks
│   ├── validations.ts    # Zod validation schemas
│   └── utils.ts          # Formatting, class merging, currency helpers
│
├── services/             # Domain Business Logic
│   ├── product.service.ts
│   ├── hrms.service.ts
│   ├── customer.service.ts
│   ├── seller.service.ts
│   ├── order.service.ts
│   ├── payment.service.ts
│   └── inventory.service.ts
│
├── store/                # Client State Stores
│   ├── auth-store.ts     # User auth session state
│   ├── cart-store.ts     # Shopping cart state
│   └── ui-store.ts       # Global toast & drawer state
│
├── types/                # TypeScript Interfaces & Types
│   ├── user.ts
│   ├── product.ts
│   ├── seller.ts
│   ├── order.ts
│   ├── cart.ts
│   ├── payment.ts
│   └── hrms.ts
│
├── prisma/               # Database Schema
│   └── schema.prisma
│
└── docs/                 # System Architecture & Audit Reports
    ├── PROJECT_AUDIT.md
    └── PROJECT_ARCHITECTURE.md
```

---

## 3. Core Separation of Concerns & Rules

1. **No Direct DB Access in Pages**: Server components and API route handlers delegate query execution to the business services layer (`services/`).
2. **Server-Side Authorization**: Every sensitive action or query verifies role permissions via `lib/permissions.ts` on the server before modifying data.
3. **Resilient Data Layer**: Services attempt Prisma queries against MySQL and fallback safely to mock in-memory seed stores when MySQL is offline during development/prerendering.
4. **Unified Design Tokens**: All visual styling uses standard Tailwind CSS v4 variables with high-contrast dark theme colors (`bg-zinc-950`, `bg-zinc-900`, `border-zinc-800`).
