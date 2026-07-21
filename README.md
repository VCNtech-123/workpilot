# WorkPilot – Multi‑Tenant SaaS Backend

## 📌 Overview

**WorkPilot** is a multi‑tenant SaaS backend built for freelancers and small agencies to manage:

* **Clients**
* **Projects**
* **Tasks**
* **Dashboard Metrics**

The system is designed with strict multi‑tenant isolation, lifecycle modeling (soft delete + restore), and production‑aware middleware. This backend is intended to power a future full‑stack application.

---

## 🧠 Core Design Goals

* Enforce strict multi‑tenant data isolation.
* Model real business lifecycle states (not just CRUD).
* Maintain a clean separation of concerns.
* Prioritize correctness before optimization.
* Keep the architecture scalable and production‑aware.

---

## 🏗 Architecture

```text
src/
├── modules/
│   ├── auth/
│   ├── client/
│   ├── project/
│   ├── task/
│   └── dashboard/
├── middleware/
├── utils/
└── types/
```

### Layered Structure

* **Routes** → Define API endpoints.
* **Controllers** → Handle the HTTP layer (req/res).
* **Services** → House the business logic.
* **Models** → Define database schemas.
* **Middleware** → Handle cross‑cutting concerns (auth, security, rate limiting).

> **Note:** Business logic is never placed inside controllers to maintain modularity and testability.

---

## 🔐 Authentication & Multi‑Tenancy

### JWT-Based Authentication

* The user logs in and the server issues a signed JWT.
* A `protect` middleware verifies the token on incoming requests.
* The authenticated user object is safely attached to `req.user`.

### Multi‑Tenant Enforcement

Every business entity schema contains an owner reference:

```typescript
owner: ObjectId
```

All database queries automatically enforce tenant boundaries:

```typescript
{ owner: req.user._id, isDeleted: false }
```

**This approach ensures:**
* Logical tenant isolation.
* No cross‑tenant data leakage.
* Security enforced at the database level rather than just the application level.

---

## ♻️ Lifecycle Modeling

The system uses a **soft delete** pattern to preserve data integrity:

```typescript
isDeleted: boolean
```

### Delete Behavior
* `DELETE` requests simply set `isDeleted = true`.
* List endpoints always filter by `isDeleted: false`.
* Project deletion cascades to associated Tasks.

### Restore Endpoints
* `PATCH /api/projects/:id/restore`
* `PATCH /api/tasks/:id/restore`

> *Restore actions do NOT cascade automatically, requiring explicit intent.*

---

## 📊 Dashboard Endpoint

`GET /api/dashboard`

Returns aggregated data utilizing parallel queries (`Promise.all`) for maximum performance:
* Total Clients
* Total Projects (Active & Completed)
* Total Tasks (To Do, In Progress, Done, Overdue)

---

## 🚀 Pagination & Filtering

List endpoints support structured query parameters:

```http
GET /api/projects?page=1&limit=10
```

**Filtering examples:**
```http
GET /api/projects?status=active
GET /api/tasks?priority=high
GET /api/tasks?project=projectId
```
*Pagination logic is extracted into a reusable utility function.*

---

## 🛡 Security Middleware

* ✅ **JWT Authentication**
* ✅ **Helmet** (Secure HTTP headers)
* ✅ **Global Rate Limiting**
* ✅ **Strict ID Validation**
* ✅ **Field Whitelisting** in updates (No dynamic payload spreading)
* ✅ **No Client‑Controlled Ownership**

---

## ⚡ Performance Awareness

* **Targeted Indexes:** Added for `owner`, `project`, `client`, `status`, and `isDeleted`.
* **Pagination:** Prevents unbounded, memory-heavy queries.
* **Parallel Execution:** Dashboard aggregation uses parallel queries to reduce latency.

---

## 🧩 TypeScript Discipline

* **No `any` types** in business logic.
* Strongly typed `req.user`.
* Strongly typed Service classes.
* Explicit update whitelisting via DTOs/interfaces.
* Domain‑level enums for status and priority.

---

## 🧠 Design Decisions & Reflections

This project intentionally avoids premature optimization, hard deletes, and over‑engineered early aggregation pipelines.

### Key Decisions
1. **Soft Delete:** Prioritized for lifecycle safety and recovery.
2. **Owner Duplication:** Included in child entities (Tasks) for defense‑in‑depth multi‑tenancy.
3. **Explicit Whitelisting:** Replaced dynamic update spreading to prevent mass-assignment vulnerabilities.
4. **Correct HTTP Semantics:** Using `DELETE` for removal and `PATCH` for restoration.

### Learning Highlights
* Middleware request mutation (`req.user`).
* Query‑level tenant enforcement.
* Relational validation patterns.
* TypeScript narrowing & schema typing.
* Lifecycle state discipline.

---

## 🛣 Future Improvements

* [ ] Add **Zod** validation layer for request payloads.
* [ ] Implement **Redis** caching for the dashboard endpoint.
* [ ] Write a complete **Jest** test suite.
* [ ] Migrate from Mongoose to **Prisma** ORM.
* [ ] Introduce a **Workspace-based** team architecture.
* [ ] **Dockerize** the application.
* [ ] Deploy to **AWS** via CI/CD pipelines.

---

### 🧑‍💻 Author
*Built as a structured SaaS backend project to transition from simple CRUD APIs to robust, production‑oriented backend architecture.*
