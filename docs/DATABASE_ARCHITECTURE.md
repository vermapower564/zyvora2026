# ZYVORA — DATABASE ARCHITECTURE SPECIFICATION (PHASE 2)

---

## 1. Overview
The database layer for Zyvora uses **MySQL** managed by **Prisma ORM (v5.22.0)**. 
All models are defined in [`prisma/schema.prisma`](file:///c:/Users/HP/OneDrive/Desktop/zyvora/prisma/schema.prisma) and map directly to both E-Commerce Marketplace entities and Internal OMS Operational entities.

---

## 2. Core Entity Domains

### E-Commerce Marketplace Entities
1. **User**: Central identity storing emails, hashed passwords, roles (`Role` enum), and profile metadata.
2. **SellerProfile**: Vendor profile attached 1-to-1 with a `User`, containing store names, slugs, ratings, and commission rates.
3. **Category**: Hierarchical product categories with unique slugs.
4. **Product**: Multi-vendor product items associated with a `SellerProfile` and `Category`, storing pricing (`Float`), inventory (`stock`), attributes (`Json`), and tags.
5. **Review**: Customer ratings (1-5) and feedback comments linked to `Product` and `User`.
6. **Address**: Shipping and billing addresses belonging to `User`.
7. **Order**: Customer orders containing shipping address snapshots, financial breakdowns (`subtotal`, `tax`, `shippingFee`, `discount`, `totalAmount`), `OrderStatus` enum, and payment status.
8. **OrderItem**: Line items mapping purchased products, quantities, prices, and seller IDs to an `Order`.
9. **Coupon**: Promotional discount codes with validity rules and minimum spend thresholds.
10. **Payout**: Vendor earnings withdrawal requests processed by Finance/Admin.

### Enterprise OMS Entities
1. **Employee**: Internal staff records with employee codes, departments, designations, and salaries.
2. **Attendance**: Daily clock-in/out logs, work hours, and presence statuses.
3. **DailyWorkUpdate**: EOD work logs, task descriptions, hours spent, and git commit links.
4. **Project**: Client deliverables, budgets, deadlines, and completion percentages.
5. **Client**: Customer organization CRM profiles, active project counts, and total revenue spent.
6. **SalesDeal**: CRM opportunity pipeline, deal values, closing dates, and probability scores.
7. **FinanceTransaction**: Accounting ledger storing income/expense categories, dates, and amounts.
8. **PayrollRecord**: Monthly salary disbursals, base pay, bonuses, deductions, and net pay.
9. **LeaveRequest**: Time-off applications, leave types, start/end dates, and approval states.
10. **Resignation**: Staff exit applications, notice periods, last working days, and workflow states.
11. **InternStudent**: Intern tracking, university degrees, stipends, and full-time hiring reviews.
12. **DevCommit**: Developer git commit metrics, repository activity, and code line counts.
13. **SeoKeyword**, **AdCampaign**, **DesignAsset**, **VideoProduction**, **ITAsset**, **PdfDocument**, **AuditLog**.

---

## 3. Database Integrity & Safety Controls

1. **Non-Destructive Migrations**: Production and development schemas preserve working data; `prisma migrate reset` is strictly forbidden.
2. **Cascading Deletions**: Parent-child relations (`User` → `Address`, `Order` → `OrderItem`, `Product` → `Review`) enforce `onDelete: Cascade` to prevent orphaned records.
3. **Index Coverage**: Primary keys use UUID generators (`@default(uuid())`); unique indexes protect `User.email`, `SellerProfile.userId`, `SellerProfile.slug`, `Product.slug`, `Category.slug`, `Order.orderNumber`, `Coupon.code`, `Employee.employeeCode`, `Client.email`, `ITAsset.assetTag`, and `ITAsset.serialNumber`.
