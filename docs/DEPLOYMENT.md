# ZYVORA — PRODUCTION DEPLOYMENT SPECIFICATION

---

## 1. Environment Configuration

Copy `.env.example` to `.env` and configure production credentials:

```bash
# Database (MySQL production connection)
DATABASE_URL="mysql://username:password@production-db-host:3306/zyvora_db"

# Authentication Secrets
JWT_SECRET="generate-a-strong-random-64-char-string"
NEXTAUTH_SECRET="generate-another-strong-random-string"

# App URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

---

## 2. Database Migration & Prisma Generation

Run Prisma validation and push schema to live MySQL server:

```bash
npx prisma validate
npx prisma generate
npx prisma db push
```

---

## 3. Production Build & Start

Compile Next.js application and run production server:

```bash
npm run build
npm run start
```

For Vercel deployment:
- Connect repository.
- Configure Environment Variables in Vercel Dashboard.
- Build command: `npm run build`
- Output directory: `.next`
