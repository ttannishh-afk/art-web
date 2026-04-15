# Art Portfolio

A full-stack artist portfolio and studio storefront built with Next.js, TypeScript, Prisma, PostgreSQL, NextAuth, Tailwind CSS, and Vercel Blob storage.

## What’s in here

- Portfolio and landing pages for studio, workshops, murals, and impact
- Public gallery with category filters
- Shop, cart, and product detail pages
- Email/password authentication with protected account flows
- Admin panel for products, gallery items, orders, and contact inquiries
- Database-backed contact form submissions

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth credentials provider
- Zustand
- Vercel Blob

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required values:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAILS`
- `BLOB_READ_WRITE_TOKEN`

## Development

```bash
npm install
npx prisma generate
npm run db:push
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run db:seed
npm run build
```

## Notes

- Contact inquiries are now stored in the database and surfaced in the admin panel.
- Checkout remains in development mode and does not process real payments yet.
- If you change the Prisma schema, run `npx prisma generate` and `npm run db:push` again.
