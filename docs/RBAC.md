# ZYVORA — ROLE-BASED ACCESS CONTROL (RBAC) SPECIFICATION (PHASE 4)

---

## 1. Overview
Role-Based Access Control (RBAC) in Zyvora is enforced through a centralized permission matrix located in [`lib/permissions.ts`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/lib/permissions.ts). Every user is assigned a primary `Role` enum value on their `User` model, which grants or denies specific granular permissions across E-Commerce and Enterprise OMS modules.

---

## 2. Role Categories & Mappings

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTERPRISE ROLES                         │
│  SUPER_ADMIN, DIRECTOR, HR, FINANCE, SALES_MANAGER,         │
│  PROJECT_MANAGER, DEVELOPER, SEO_EXECUTIVE, INTERN, etc.    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    MARKETPLACE ROLES                        │
│  CUSTOMER, SELLER, ADMIN                                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 CENTRALIZED RBAC GUARDS                     │
│  `hasPermission(role, permission)` in `lib/permissions.ts`  │
│  `canAccessRoute(role, pathname)` in `lib/permissions.ts`   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Permission Token Matrix

| Permission | Permitted Roles | Description |
| :--- | :--- | :--- |
| `employees.view` | `SUPER_ADMIN`, `DIRECTOR`, `HR`, `FINANCE`, `PROJECT_MANAGER` | View employee directory & profiles |
| `employees.create` | `SUPER_ADMIN`, `HR` | Add new employee records |
| `employees.update` | `SUPER_ADMIN`, `HR` | Edit employee details & salaries |
| `attendance.view` | `SUPER_ADMIN`, `DIRECTOR`, `HR`, `PROJECT_MANAGER`, `DEVELOPER`, `INTERN` | View clock in/out attendance history |
| `attendance.manage` | `SUPER_ADMIN`, `HR` | Manual attendance status overrides |
| `projects.view` | `SUPER_ADMIN`, `DIRECTOR`, `PROJECT_MANAGER`, `DEVELOPER`, `CLIENT` | View project deliverables & progress |
| `projects.manage` | `SUPER_ADMIN`, `DIRECTOR`, `PROJECT_MANAGER` | Create, update, or archive projects |
| `finance.view` | `SUPER_ADMIN`, `DIRECTOR`, `FINANCE` | Access ledger income & expenses |
| `payroll.approve` | `SUPER_ADMIN`, `DIRECTOR`, `FINANCE`, `HR` | Approve monthly salary disbursals |
| `leave.approve` | `SUPER_ADMIN`, `HR`, `PROJECT_MANAGER` | Approve staff time-off applications |
| `audit.view` | `SUPER_ADMIN`, `DIRECTOR` | Access immutable security audit logs |

---

## 4. Enforcement Guidelines

1. **Server-Side Verification**: Route handlers and server actions verify `canAccessRoute(role, path)` before executing queries.
2. **Client-Side Visual Guards**: Navigation sidebar links in [`components/layout/oms-sidebar.tsx`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/components/layout/oms-sidebar.tsx) dynamically filter forbidden menu sections based on active user roles.
