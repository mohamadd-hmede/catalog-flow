# CatalogFlow

CatalogFlow is a content-driven product catalog built with Next.js using the App Router. It demonstrates dynamic routes, Server Components, Server Actions, form state handling, metadata, loading states, error handling, and responsive styling with Tailwind CSS.

## Features

- Responsive product catalog
- Featured products on the home page
- Dynamic product detail pages
- Product images and descriptions
- Dynamic metadata for product pages
- Custom product not-found page
- Loading state for the products route
- Error boundary with retry functionality
- Contact form using a Server Action
- Form feedback using `useActionState`
- Pending submission state using `useFormStatus`
- Shared header and footer through the root layout

## Next.js Concepts Used

### App Router

The project uses the Next.js App Router with file-based routing inside the `app` directory.

### Dynamic Routes

Product detail pages use:

```text
/products/[productId]
```

Examples:

```text
/products/1
/products/2
/products/3
```

The product ID is read from `params` and used to display the selected product.

### Server Components

Pages are Server Components by default unless client-side React functionality is required.

### Client Components

Client Components are used only where needed. The contact form uses `useActionState`, and the submit button uses `useFormStatus`.

### Server Actions

The contact form submits to a Server Action defined in:

```text
app/contact/actions.ts
```

The action receives `FormData`, processes the submitted values, and returns a state message to the UI.

### Dynamic Metadata

Product pages use `generateMetadata()` to generate a unique page title and description for each product.

### Loading, Error, and Not Found

The project uses:

```text
loading.tsx
error.tsx
not-found.tsx
```

`notFound()` is used when a requested product does not exist.

## Screenshots

### Home Page

![Home Page](screenshots/home-page.png)

### Products Page

![Products Page](screenshots/products-page.png)

### Product Details

![Product Details](screenshots/product-details.png)

### Contact Form

![Contact Page](screenshots/contact-page.png)

## Project Structure

```text
app/
├── components/
│   ├── Footer.tsx
│   └── Header.tsx
├── contact/
│   ├── actions.ts
│   ├── contact-form.tsx
│   ├── page.tsx
│   └── submit-button.tsx
├── products/
│   ├── [productId]/
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── data.ts
│   ├── error.tsx
│   ├── loading.tsx
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

public/
└── products/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Production Build

Create an optimized production build:

```bash
npm run build
```

The project has been verified to compile successfully.

## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS

## Purpose

This project was created as Week 4 practical work to apply Next.js concepts including the App Router, dynamic routes, Server Components, and Server Actions in a functional content-driven application.

## Github Repository Link

https://github.com/mohamadd-hmede/catalog-flow.git
