# ZYVORA — AUTHENTICATION SPECIFICATION (PHASE 3)

---

## 1. Overview
Zyvora uses a hybrid server-side and client-side session authentication system. Passwords are securely hashed using salt routines in [`lib/auth.ts`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/lib/auth.ts), while user sessions and active JWT tokens are managed through persistent Zustand stores (`store/auth-store.ts`) and HTTP auth headers.

---

## 2. Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    LOGIN REQUEST                        │
│  Post `{ email, password }` to API route                │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  ZOD PAYLOAD VALIDATION                 │
│  Validate format, length, and non-empty criteria        │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  ACCOUNT DATABASE LOOKUP                │
│  Fetch User record from MySQL via Prisma Client         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 PASSWORD HASH VERIFICATION              │
│  `verifyPassword(plain, hashedPassword)` in `lib/auth.ts`│
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                SESSION CREATION & RESPONSE              │
│  Generate auth token, scrub password, return User state │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Core Auth Endpoints & Utilities

- **[`lib/auth.ts`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/lib/auth.ts)**: Contains `hashPassword()`, `verifyPassword()`, and JWT token verification logic.
- **[`store/auth-store.ts`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/store/auth-store.ts)**: Client store handling user session state, token persistence, and role metadata.
- **[`hooks/useAuth.ts`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/hooks/useAuth.ts)**: React hook for accessing auth states, logging in, logging out, and checking permissions.
- **API Endpoints**:
  - `POST /api/customer/login`: Validates customer credentials.
  - `POST /api/customer/register`: Registers a new customer account.
  - `POST /api/seller/login`: Authenticates vendor store users.
  - `POST /api/seller/register`: Registers new seller vendor profiles.

---

## 4. Security Rules & Protection Controls

1. **Password Safety**: Passwords are never stored in plaintext and never returned in API response bodies.
2. **Account Disambiguation**: Generic error messages (`"Invalid email or password"`) prevent account enumeration attacks.
3. **Session Revocation**: `logout()` clears all stored client tokens and resets the Zustand session store.
