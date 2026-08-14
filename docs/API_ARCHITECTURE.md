# ZYVORA — API ARCHITECTURE & ENDPOINTS SPECIFICATION (PHASE 5)

---

## 1. Overview
API endpoints in Zyvora are built using Next.js App Router Route Handlers located under `app/api/`. Every request undergoes input validation with **Zod (`lib/validations.ts`)**, authorization verification with **RBAC (`lib/permissions.ts`)**, and delegates queries to the business services layer (`services/`).

---

## 2. Standardized Response Format

### Successful Response Format (`HTTP 200 / 201`):
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response Format (`HTTP 400 / 401 / 403 / 404 / 409 / 422 / 500`):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters"
  }
}
```

---

## 3. Core API Route Registry

| Endpoint Route | Methods | Description | Protected |
| :--- | :--- | :--- | :--- |
| `app/api/contact/route.ts` | POST, GET, PATCH | Contact Us submissions & Admin Ticket Desk | POST: Public; GET/PATCH: Admin |
| `app/api/products/route.ts` | GET, POST | Catalog search & product creation | POST require `SELLER`/`ADMIN` |
| `app/api/products/[id]/route.ts` | GET, PUT, DELETE | Single product CRUD | PUT/DELETE require item ownership |
| `app/api/orders/route.ts` | GET, POST | Place orders & retrieve history | Requires authenticated session |
| `app/api/payments/route.ts` | POST | Gateway payment status updates | Requires authenticated session |
| `app/api/cart/route.ts` | GET, POST, DELETE | Cart operations & checkout validation | Requires authenticated session |
| `app/api/uploads/route.ts` | POST | Image asset upload handler | Requires `SELLER`/`EMPLOYEE` |
| `app/api/customer/login` | POST | Customer authentication | Public |
| `app/api/customer/register` | POST | Customer account registration | Public |
| `app/api/seller/login` | POST | Vendor store authentication | Public |
| `app/api/seller/register` | POST | Vendor store registration | Public |

---

## 4. HTTP Status Code Conventions

- `200 OK`: Resource successfully retrieved or processed.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Zod payload validation failure or missing required fields.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated user lacks required RBAC role permissions.
- `404 Not Found`: Requested database entity does not exist.
- `422 Unprocessable Entity`: Business validation error.
- `500 Internal Error`: Server runtime error (masked to prevent secret disclosure).
