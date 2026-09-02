# CatalogFlow

CatalogFlow is a production-ready full-stack product catalog and management application built with **Next.js, TypeScript, PostgreSQL, and Prisma**.

The project was developed progressively during an internship, starting as a content-driven Next.js catalog and evolving into an authenticated full-stack application with CRUD operations, cloud image storage, analytics, automated BDD testing, and production deployment.

## 🌐 Live Demo

**Production:** https://catalog-flow-production.vercel.app

## ✨ Features

- Responsive product catalog
- Featured products on the home page
- Dynamic product detail pages
- Create, read, update, and delete products
- Google authentication with Auth.js
- Per-user product ownership and authorization
- PostgreSQL persistence with Prisma
- REST API using Next.js Route Handlers
- Product image uploads with Vercel Blob
- Automatic cleanup of replaced and deleted images
- Dynamic metadata for product pages
- Loading, error, and not-found states
- Contact form using a Next.js Server Action
- Cache revalidation after product mutations
- Product analytics with PostHog
- BDD testing with Cucumber.js
- Production PostgreSQL database with Neon
- Production deployment on Vercel

## 🛠️ Tech Stack

| Area                | Technology                       |
| ------------------- | -------------------------------- |
| Framework           | Next.js 16                       |
| UI                  | React                            |
| Language            | TypeScript                       |
| Styling             | Tailwind CSS                     |
| Backend             | Next.js Route Handlers           |
| API                 | REST                             |
| Authentication      | Auth.js / NextAuth, Google OAuth |
| Database            | PostgreSQL                       |
| ORM                 | Prisma                           |
| Production Database | Neon PostgreSQL                  |
| Image Storage       | Vercel Blob                      |
| Analytics           | PostHog                          |
| Testing             | Cucumber.js / BDD                |
| Deployment          | Vercel                           |

## 🏗️ Architecture

CatalogFlow is an integrated Next.js full-stack application.

```text
Browser
   │
   ▼
Next.js Application
   │
   ├── Server Components ──────────┐
   │                               │
   └── Route Handlers              │
              │                    │
              └─────────┬──────────┘
                        ▼
                     Prisma
                        │
                        ▼
                   PostgreSQL
                  Local / Neon

Auth.js       → Authentication
Vercel Blob   → Product Images
PostHog       → Analytics
Vercel        → Deployment
```

Server Components access Prisma directly where appropriate, while browser-driven CRUD operations use Next.js Route Handlers.

The Route Handlers manage request validation, authentication, authorization, database mutations, image operations, cache revalidation, and server-side analytics events.

## 🚀 API

Product CRUD operations are implemented using **Next.js Route Handlers**.

| Method   | Endpoint            | Description         | Access        |
| -------- | ------------------- | ------------------- | ------------- |
| `GET`    | `/api/products`     | Get all products    | Public        |
| `GET`    | `/api/products/:id` | Get a product by ID | Public        |
| `POST`   | `/api/products`     | Create a product    | Authenticated |
| `PUT`    | `/api/products/:id` | Update a product    | Owner only    |
| `DELETE` | `/api/products/:id` | Delete a product    | Owner only    |

Authentication and product ownership checks are enforced server-side for protected operations.

## 🔐 Authentication & Authorization

CatalogFlow uses **Auth.js / NextAuth** with Google OAuth.

Authenticated users can create products. Each created product is associated with its owner.

Update and delete operations verify that the authenticated user owns the requested product before allowing the operation.

Authorization is enforced inside the Route Handlers rather than relying only on the user interface.

## 🗄️ Database

CatalogFlow uses **PostgreSQL** with **Prisma ORM**.

The database schema is defined in:

```text
prisma/schema.prisma
```

Database migrations are stored in:

```text
prisma/migrations/
```

The application uses separate database environments:

```text
Development → Local PostgreSQL
Production  → Neon PostgreSQL
```

Neon provides the production PostgreSQL database, while Prisma is used for database modelling, migrations, and application data access.

## 🖼️ Image Storage

Product images are stored using **Vercel Blob** instead of the application's local filesystem.

The application:

- Accepts JPEG, PNG, and WebP images
- Limits image uploads to 4 MB
- Stores the generated Blob URL with the product
- Keeps the existing image when no replacement is provided
- Removes the previous Blob image when an image is replaced
- Removes the associated Blob image when a product is deleted

## ⚡ Next.js Features

CatalogFlow uses several Next.js App Router features:

- Server Components
- Client Components
- Dynamic routes
- Route Handlers
- Server Actions
- Dynamic metadata
- Cache revalidation
- Loading UI
- Error boundaries
- Not-found handling

Dynamic product routes include:

```text
/products/[productId]
/products/[productId]/edit
```

The contact form demonstrates Next.js Server Actions through:

```text
app/contact/actions.ts
```

## 🔄 Data Fetching & Revalidation

CatalogFlow uses server-side data access where appropriate.

Server Components can query PostgreSQL directly through Prisma, while browser-driven product mutations use the REST API provided by Next.js Route Handlers.

After product mutations, affected routes are revalidated using Next.js cache revalidation.

This keeps rendered product data synchronized with database changes without requiring a separate backend application.

## 📊 Analytics

CatalogFlow integrates **PostHog** for product and application analytics.

Tracked product lifecycle events include:

```text
product_created
product_updated
product_deleted
```

Contact form activity and authenticated user identification are also integrated with PostHog.

Analytics events are captured from client-side and server-side application code where appropriate.

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

### Contact Page

![Contact Page](screenshots/contact-page.png)

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create local environment files using `.env.example` as a reference.

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/catalog_flow"
APP_URL=http://localhost:3000

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_generated_auth_secret

BLOB_STORE_ID=""
BLOB_READ_WRITE_TOKEN=""

NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Never commit real credentials or secrets to the repository.

### 3. Apply Database Migrations

```bash
npx prisma migrate dev
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Seed Development Data

Optional development seed data can be inserted with:

```bash
npm run seed
```

### 6. Start the Application

```bash
npm run dev
```

The development application runs at:

```text
http://localhost:3000
```

CatalogFlow runs as a single integrated Next.js application. A separate Express server is not required in the final architecture.

## ✅ Testing & Build

Run the BDD test suite:

```bash
npm run test:bdd
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The production build generates the Prisma Client before building Next.js:

```text
prisma generate && next build
```

## ☁️ Deployment

CatalogFlow is deployed on **Vercel**.

The production environment uses:

| Service      | Purpose                                    |
| ------------ | ------------------------------------------ |
| Vercel       | Next.js application hosting and deployment |
| Neon         | PostgreSQL database                        |
| Vercel Blob  | Product image storage                      |
| Google OAuth | Authentication                             |
| PostHog      | Analytics                                  |

Production database migrations are applied with:

```bash
npx prisma migrate deploy
```

Production credentials and service configuration are managed through environment variables and are not committed to the repository.

## 📚 Internship Development Progression

CatalogFlow was developed incrementally across Weeks 4, 5, and 6 of the internship.

### Week 4 — Next.js Catalog

Built the initial content-driven CatalogFlow application using:

- Next.js App Router
- Dynamic product routes
- Server Components
- Server Actions
- Dynamic metadata
- Loading, error, and not-found states
- Responsive styling

**Deliverable:** Build-ready Next.js catalog.

### Week 5 — BDD, Database & CRUD Backend

Extended CatalogFlow through BDD testing, database modelling, and backend development.

Week 5 included:

- Created Given/When/Then feature specifications
- Automated BDD tests using Cucumber.js
- Modelled the product database with Prisma
- Applied database migrations to PostgreSQL
- Built a Node.js and Express REST API
- Implemented full product CRUD operations
- Connected the Express API to Prisma and PostgreSQL
- Consumed the backend from the Next.js frontend

Express was used during this stage as a standalone backend to apply Node.js, REST API, and database concepts.

**Deliverables:** Passing BDD suite, Prisma schema and migrations, and full-stack CRUD application.

### Week 6 — Production-Ready Full-Stack Integration

Evolved CatalogFlow from the Week 5 architecture into a single production-ready full-stack Next.js application.

The Week 5 Express CRUD API was migrated to **Next.js Route Handlers**, removing the need for a separate backend server in the final architecture.

Week 6 included:

- Migrated product CRUD operations to Next.js Route Handlers
- Added Google authentication with Auth.js / NextAuth
- Protected product management operations
- Added per-user product ownership and authorization
- Added Vercel Blob image uploads
- Added cleanup of replaced and deleted product images
- Improved server-side data fetching
- Added cache revalidation after product mutations
- Improved loading, success, and error feedback for CRUD operations
- Added PostHog analytics and product event tracking
- Configured Neon PostgreSQL for production
- Configured production environment variables
- Improved responsive navigation and authentication controls
- Prepared and deployed the application on Vercel
- Verified authentication, CRUD operations, image storage, database persistence, analytics, and production behavior

**Deliverable:** Shippable production-ready full-stack CatalogFlow application.

## 🎯 Project Evolution

```text
Next.js Catalog
      ↓
BDD with Cucumber
      ↓
Prisma + PostgreSQL
      ↓
Express CRUD API
      ↓
Next.js Route Handlers
      ↓
Authentication + Ownership
      ↓
Cloud Image Storage + Analytics
      ↓
Production Deployment
```

CatalogFlow demonstrates the progression from a content-driven Next.js project to a complete, authenticated, database-backed, production-deployed full-stack application.
