# CatalogFlow

A full-stack product catalog built with **Next.js, Node.js, Express, PostgreSQL, and Prisma**.

CatalogFlow started as a content-driven Next.js application and was extended into a full-stack CRUD application during the internship. It combines a modern Next.js front-end with an Express REST API and PostgreSQL database, while also including BDD testing with Cucumber.js.

## ✨ Features

- Responsive product catalog
- Featured products on the home page
- Dynamic product detail pages
- Create, view, edit, and delete products
- PostgreSQL-backed product data
- REST API with full CRUD operations
- Dynamic metadata for product pages
- Loading, error, and not-found states
- Contact form using Next.js Server Actions
- Shared responsive layout
- BDD testing with Cucumber.js

## 🏗️ Architecture

Product data flows through the application as follows:

```text
┌─────────────────────┐
│   Next.js Frontend  │
└──────────┬──────────┘
           │ HTTP Requests
           ▼
┌─────────────────────┐
│   Express REST API  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

The Next.js front-end consumes the Express API, while PostgreSQL acts as the persistent data store.

## 🚀 REST API

The Express backend provides full CRUD operations for products:

| Method   | Endpoint            | Description          |
| -------- | ------------------- | -------------------- |
| `GET`    | `/api/products`     | Get all products     |
| `GET`    | `/api/products/:id` | Get a product by ID  |
| `POST`   | `/api/products`     | Create a new product |
| `PUT`    | `/api/products/:id` | Update a product     |
| `DELETE` | `/api/products/:id` | Delete a product     |

## ⚡ Next.js Implementation

### App Router

The project uses the Next.js App Router with file-based routing inside the `app` directory.

### Dynamic Routes

Dynamic routes are used for product details and editing:

```text
/products/[productId]
/products/[productId]/edit
```

### Server Components

Pages are Server Components by default. Product data is fetched from the Express API and rendered by the Next.js application.

### Client Components

Client Components are used where browser-side interaction is required, including:

- Add Product form
- Edit Product form
- Delete Product button
- Contact form state

### Server Actions

The contact form uses a Server Action located in:

```text
app/contact/actions.ts
```

### Dynamic Metadata

Product detail pages use `generateMetadata()` to provide product-specific page titles and descriptions.

### Loading, Error & Not Found

The application provides dedicated states using:

```text
loading.tsx
error.tsx
not-found.tsx
```

## 🧪 BDD Testing

Behavior-Driven Development specifications are written using **Given / When / Then** syntax and automated with **Cucumber.js**.

```text
features/
├── catalog.feature
└── step_definitions/
    └── catalog.steps.js
```

Run the BDD test suite with:

```bash
npm run test:bdd
```

## 🗄️ Database

Product data is stored in **PostgreSQL**.

The database structure is modelled using Prisma:

```text
prisma/schema.prisma
```

Database migrations are stored in:

```text
prisma/migrations/
```

Initial CatalogFlow products can be inserted using the seed script:

```bash
npm run seed
```

## 📸 Screenshots

### Home Page

![Home Page](screenshots/home-page.png)

### Products Page

![Products Page](screenshots/products-page.png)

### Product Details

![Product Details](screenshots/product-details.png)

### Add Product

![Add Product](screenshots/add-product.png)

### Edit Product

![Edit Product](screenshots/edit-product.png)

### Contact Form

![Contact Page](screenshots/contact-page.png)

## 📁 Project Structure

```text
catalog-flow/
├── app/
│   ├── components/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   │
│   ├── contact/
│   │   ├── actions.ts
│   │   ├── contact-form.tsx
│   │   ├── page.tsx
│   │   └── submit-button.tsx
│   │
│   ├── products/
│   │   ├── [productId]/
│   │   │   ├── edit/
│   │   │   │   └── page.tsx
│   │   │   ├── delete-button.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── new/
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── features/
│   ├── step_definitions/
│   │   └── catalog.steps.js
│   └── catalog.feature
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── server/
│   └── app.js
│
├── public/
│   └── products/
│
├── screenshots/
├── .env.example
├── package.json
└── README.md
```

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure PostgreSQL

Create a PostgreSQL database named:

```text
catalog_flow
```

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/catalog_flow"
```

### 3. Apply the Database Migration

```bash
npx prisma migrate dev
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Seed Initial Products

```bash
npm run seed
```

## ▶️ Running the Application

The backend and front-end run separately.

Start the Express API:

```bash
npm run server
```

The API runs at:

```text
http://localhost:5000
```

Open another terminal and start the Next.js application:

```bash
npm run dev
```

The front-end runs at:

```text
http://localhost:3000
```

## ✅ Testing

Run the BDD test suite:

```bash
npm run test:bdd
```

Create a production build:

```bash
npm run build
```

The application has been verified to compile successfully.

## 🛠️ Technologies

| Area               | Technology                 |
| ------------------ | -------------------------- |
| Front-end          | Next.js, React, TypeScript |
| Styling            | Tailwind CSS               |
| Backend            | Node.js, Express.js        |
| API                | REST                       |
| Database           | PostgreSQL                 |
| Database Modelling | Prisma                     |
| Testing            | Cucumber.js, BDD           |

## 📚 Practical Work Covered

### Week 4 — Next.js Project

Built the original content-driven CatalogFlow application using:

- App Router
- Dynamic routes
- Server Components
- Server Actions
- Dynamic metadata
- Loading, error, and not-found states
- Responsive styling

### Week 5 — BDD Exercise

Created Given/When/Then feature specifications and automated them with Cucumber.js.

**Deliverable:** Passing BDD test suite.

### Week 5 — Prisma Exercise

Modelled the product database with Prisma and applied the schema to PostgreSQL using migrations.

**Deliverable:** Prisma schema and migration.

### Week 5 — Full-Stack CRUD Project

Extended CatalogFlow with a Node.js and Express REST API connected to PostgreSQL and consumed by the Next.js front-end.

Express was used at this stage to apply the Node.js and Express concepts covered during Week 5.

The application supports:

- Creating products
- Reading products
- Updating products
- Deleting products
- Persistent PostgreSQL storage

**Deliverable:** Full-stack CRUD application.

## 🎯 Purpose

CatalogFlow was developed as practical internship work across **Weeks 4 and 5**.

The project demonstrates the progression from a content-driven Next.js application to a full-stack application with automated BDD testing, database modelling, PostgreSQL persistence, REST APIs, and complete CRUD functionality.

CatalogFlow will continue to evolve in Week 6 with authentication and the integration of the project into a production-ready full-stack application.
