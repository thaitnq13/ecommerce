# Ecommerce Platform Checklist & Plan

## 1. Project Initialization
- [x] Initialize Next.js App (TypeScript, Tailwind, App Router, Src directory).
- [x] Install dependencies:
    - [x] Core: `clsx`, `tailwind-merge`
    - [x] Icons: `lucide-react`
    - [x] Animation: `framer-motion`
    - [x] Data/State: `react-hook-form`, `zod`, `@hookform/resolvers`
    - [x] UI: `class-variance-authority`, `radix-ui` primitives (as needed for accessible components if not using a library helper CLI, or install shadcn/ui).
    - [x] Backend: `prisma`, `@prisma/client`
- [x] Initialize shadcn/ui (if using CLI) or set up base `utils` and `components.json`.

## 2. Database & Schema (SQLite)
- [x] Initialize Prisma with SQLite provider.
- [x] Define Schema in `prisma/schema.prisma`:
    - [x] `Category` model (id, name, slug, image, createdAt, updatedAt)
    - [x] `Product` model (id, name, slug, description, price, stock, images, categoryId, createdAt, updatedAt)
- [x] Run `prisma migrate dev` to create the database file.
- [x] Create `src/lib/db.ts` for global Prisma client instance.

## 3. UI Implementation (Client First)
### Design System & Global Styles
- [x] Configure `globals.css` (Tailwind imports, base styles).
- [ ] Setup fonts (Inter or user-specified).
- [x] Create core UI components (Button, Input, Card, Table, Modal/Dialog, Label, Textarea) - *Using Shadcn/UI patterns*.

### Pages & Components
- [x] **Categories**:
    - [x] List Page (`/categories`): Display grid/table of categories.
    - [x] Create/Edit Page (`/categories/new`, `/categories/[id]/edit`): Form with validation.
- [x] **Products**:
    - [x] List Page (`/products`): Display grid/table of products with Category filter.
    - [ ] Detail Page (`/products/[id]`): View product details.
    - [x] Create/Edit Page (`/products/new`, `/products/[id]/edit`): Form for product details (including category selection).
- [x] **Home/Landing**:
    - [x] Simple landing page showcasing categories and featured products.

## 4. Server Integration
- [x] **API Routes**:
    - [x] `GET /api/categories`
    - [x] `POST /api/categories`
    - [x] `GET /api/categories/[id]`
    - [x] `PATCH /api/categories/[id]`
    - [x] `DELETE /api/categories/[id]`
    - [x] `GET /api/products`
    - [x] `POST /api/products`
    - [x] `GET /api/products/[id]`
    - [x] `PATCH /api/products/[id]`
    - [x] `DELETE /api/products/[id]`
- [x] **Server Components**:
    - [x] Update List pages to fetch data server-side (optional but recommended for SEO/Performance).
    - [x] Integrate Client Forms with API routes.

## 5. Polish & Review
- [x] Verify validations (Client & Server).
- [x] Check responsive design.
- [x] Verify animations (Framer Motion).
- [x] Final SEO check (Metadata).


## 5. Polish & Review
- [ ] Verify validations (Client & Server).
- [ ] Check responsive design.
- [ ] Verify animations (Framer Motion).
- [ ] Final SEO check (Metadata).
