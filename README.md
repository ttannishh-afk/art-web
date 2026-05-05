# Art Portfolio - Full-Stack Artist Platform

A comprehensive full-stack artist portfolio and studio storefront built with cutting-edge technologies. Features a public gallery, e-commerce shop, user authentication, admin dashboard, and dynamic feature management.

**Live:** [Deployed on Vercel](https://art-portfolio-tanishgupta.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Authentication & Authorization](#authentication--authorization)
- [Admin Panel](#admin-panel)
- [Shop Feature Toggle](#shop-feature-toggle)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎨 Overview

This is a full-featured artist portfolio platform that serves multiple purposes:
- **Showcase** portfolio and works
- **E-commerce** for selling artwork
- **Admin Dashboard** for managing inventory, orders, and inquiries
- **Dynamic Feature Toggle** to enable/disable shop feature via GitHub Actions
- **Professional** contact management and order tracking

---

## ✨ Features

### Public Features
- 🖼️ **Portfolio Pages** - Multiple themed galleries (Studio, For Self, For Work, Impact)
- 🎨 **Gallery** - Public art gallery with category filters (Oil, Acrylic, Watercolor, Sketches)
- 🛍️ **Shop** (Toggle-able) - Product catalog with dynamic enable/disable via GitHub Actions
- 🛒 **Shopping Cart** - Add/remove products, quantity management
- 📧 **Contact Form** - Submit inquiries, all stored in database
- 👤 **User Registration** - Email/password signup with bcrypt encryption
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS

### Admin Features
- 🎛️ **Admin Dashboard** - "Studio Command Center" for all operations
- 📦 **Inventory Management** - Add, edit, delete products
- 🖼️ **Gallery Management** - Manage gallery items with categories
- 📊 **Order Tracking** - View all orders with customer info and items
- 💬 **Contact Management** - Review and respond to inquiries
- ⚡ **Feature Control** - Toggle shop availability via GitHub Actions
- 🔐 **Role-Based Access** - Admin access controlled via User.role in database

### Technical Features
- 🔒 **Secure Authentication** - NextAuth with credentials provider
- 💾 **Database-Backed** - PostgreSQL with Prisma ORM
- 📦 **Image Storage** - Vercel Blob for artwork images
- 🌐 **API Routes** - RESTful endpoints for cart, auth, checkout, contact
- 🎯 **Feature Flags** - Dynamic shop enable/disable without code changes
- 🚀 **Hot Reload** - Prisma singleton pattern for Next.js dev mode

---

## 🏗️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 19.2.3 |
| **Framework** | Next.js | 16.2.3 (App Router) |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 3.4.17 |
| **State Management** | Zustand | 5.0.9 |
| **Animations** | Framer Motion | 12.23.26 |
| **Authentication** | NextAuth | 4.24.13 |
| **Database** | PostgreSQL | (hosted at Prisma) |
| **ORM** | Prisma | 7.7.0 |
| **Database Adapter** | @prisma/adapter-pg | 7.7.0 |
| **Storage** | Vercel Blob | 2.0.0 |
| **Linting** | ESLint | 9.x |
| **Icons** | Lucide React | 0.562.0 |
| **Utilities** | clsx, tailwind-merge | Latest |

---

## 🏛️ Architecture

### Directory Structure

```
art-portfolio/
├── app/
│   ├── layout.tsx              # Root layout with Navbar/Footer
│   ├── page.tsx                # Home page
│   ├── admin/
│   │   └── page.tsx            # Admin dashboard (role-protected)
│   ├── shop/
│   │   ├── page.tsx            # Shop listing (feature-flagged)
│   │   └── [id]/page.tsx       # Product detail
│   ├── gallery/
│   │   └── page.tsx            # Gallery view
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth routes
│   │   ├── cart/route.ts       # Cart API
│   │   ├── checkout/route.ts   # Checkout API
│   │   ├── contact/route.ts    # Contact form API
│   │   └── register/route.ts   # Registration API
│   ├── actions.tsx             # Server actions (admin operations)
│   └── sitemap.ts              # Dynamic sitemap
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Server component with role check
│   │   ├── NavbarClient.tsx    # Client component
│   │   └── Footer.tsx
│   ├── admin/                  # Admin components
│   └── providers/              # Auth & Modal providers
├── lib/
│   ├── prisma.ts              # Prisma singleton with connection pooling
│   ├── auth.ts                # NextAuth configuration
│   ├── admin.ts               # Admin utility (checks User.role)
│   ├── features.ts            # Feature flags
│   ├── env.ts                 # Environment config
│   ├── db.ts                  # Database utility
│   └── validation.ts          # Input validation schemas
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Database seeding
├── public/                    # Static assets
├── .github/
│   └── workflows/
│       └── toggle-shop.yml    # GitHub Actions workflow
├── .env                       # Base environment variables
├── .env.local                 # Local overrides (git-ignored)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── prisma.config.ts           # Prisma 7 configuration
```

### Data Flow

```
User Login
    ↓
NextAuth Validation
    ↓
Check User.role in Database
    ↓
If role="ADMIN" → Show admin features in Navbar
    ↓
Admin Panel → Server Actions → Prisma → Database
    ↓
Revalidate cache & show updated content
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or use Prisma's hosted DB)
- Vercel account (for deployment)
- GitHub account (for feature toggle workflow)

### Step 1: Clone & Install

```bash
git clone <your-repo>
cd art-portfolio
npm install
```

### Step 2: Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Create tables (push schema to database)
npx prisma db push

# (Optional) Seed with sample data
npm run db:seed
```

### Step 3: Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see [Environment Variables](#environment-variables) below).

### Step 4: Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

---

## 🔐 Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL="postgres://user:password@host:port/dbname?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Feature Flags
SHOP_ENABLED="ENABLE"  # or "DISABLE" to hide shop
```

### Optional Variables

```bash
# PRISMA_DATABASE_URL (for Prisma Accelerate - optional)
# POSTGRES_URL (for direct connection - optional)
```

### How to Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Where to Set Variables

**Local Development:**
- Edit `.env.local` file (git-ignored)

**Production (Vercel):**
- Go to Vercel Project Settings → Environment Variables
- Add variables for `production`, `preview`, `development`

---

## 💻 Development

### Available Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint

# Database operations
npm run db:push      # Sync schema to database
npm run db:seed      # Seed sample data
npx prisma studio   # Open Prisma Studio UI
npx prisma generate # Generate Prisma client

# Prisma specific
npm run prisma:generate
```

### Development Workflow

1. **Start dev server:** `npm run dev`
2. **Make changes** to components, pages, or database schema
3. **If schema changes:** Run `npx prisma generate && npm run db:push`
4. **Hot reload** automatically updates the browser
5. **Check for errors:** `npm run typecheck && npm run lint`
6. **Build test:** `npm run build` before committing

---

## 🔑 Authentication & Authorization

### Authentication Flow

```
User Registration
    ↓
Email/Password stored (bcrypt hashed)
    ↓
NextAuth session created
    ↓
Session token stored in httpOnly cookie
```

### Authorization Model

All authorization is **role-based** using the `User.role` field in the database:

```typescript
enum Role {
  USER   // Regular user (default)
  ADMIN  // Administrator
}
```

### Protected Routes

| Route | Access | Check |
|-------|--------|-------|
| `/admin` | ADMIN only | User.role === "ADMIN" |
| `/profile` | Logged-in users | session exists |
| `/cart` | Logged-in users | session exists |
| `/shop/*` | Public (feature-flagged) | SHOP_ENABLED env var |

### Key Files

- **`lib/auth.ts`** - NextAuth configuration, credentials provider
- **`lib/admin.ts`** - `isAdminUser()` function checks database role
- **`components/layout/Navbar.tsx`** - Fetches user role, shows admin tab if ADMIN
- **`app/admin/page.tsx`** - Page-level protection for admin dashboard

---

## 🎛️ Admin Panel

### Accessing Admin Panel

1. Create account or login
2. Admin must manually set `role = "ADMIN"` in database (or seed with admin account)
3. Once admin, "/admin" link appears in navbar
4. Click to access "Studio Command Center"

### Admin Features

**Products Management**
- Add new products with title, description, price, category
- Upload images to Vercel Blob storage
- Edit/delete existing products

**Gallery Management**
- Manage gallery items with images
- Filter by category

**Orders**
- View all orders with customer details
- See order items and totals
- Track order status

**Contact Inquiries**
- View all form submissions from contact page
- Track inquiry status

### Making Someone Admin

**Option 1: Database Direct**
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'user@example.com';
```

**Option 2: Via Prisma Studio**
```bash
npx prisma studio
```
- Navigate to User table
- Find user and set role to ADMIN

---

## 🎯 Shop Feature Toggle

### What is It?

A dynamic feature flag that allows enabling/disabling the shop without code changes or redeployment.

- **`SHOP_ENABLED=ENABLE`** → Shop visible to users
- **`SHOP_ENABLED=DISABLE`** → Shop shows "Coming Soon" message

### Admin Can Still Manage Inventory

Regardless of `SHOP_ENABLED` value:
- Admins can always access `/admin`
- Admins can always manage products, gallery, orders
- Shop products are always manageable

### How to Toggle Shop

#### Step 1: Set Up GitHub Secrets (One-time)

Go to GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:
- `VERCEL_TOKEN` - From https://vercel.com/account/tokens
- `VERCEL_PROJECT_ID` - From Vercel project settings
- `VERCEL_ORG_ID` - From Vercel organization settings

#### Step 2: Trigger Workflow

1. Go to GitHub repo → Actions
2. Select "Toggle SHOP Feature" workflow
3. Click "Run workflow"
4. Choose "ENABLE" or "DISABLE"
5. Workflow updates Vercel environment variables
6. Vercel auto-redeploys with new setting

#### Step 3: Verify

- If `ENABLE`: Users see shop with products
- If `DISABLE`: Users see "Shop Coming Soon" message

### Implementation Details

**File:** `.github/workflows/toggle-shop.yml`
- Runs on `workflow_dispatch` (manual trigger)
- Updates `SHOP_ENABLED` env var via Vercel API
- Triggers automatic redeployment

**Code:** `lib/features.ts`
```typescript
export function isShopEnabled(): boolean {
  return process.env.SHOP_ENABLED?.toUpperCase() === "ENABLE";
}
```

**Usage:** `app/shop/page.tsx`
```typescript
if (!isShopEnabled()) {
  return <div>Shop Coming Soon</div>;
}
```

---

## 💾 Database Schema

### User
```typescript
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   (bcrypt hashed)
  name      String?
  phone     String?
  role      Role     @default(USER)  // USER or ADMIN
  createdAt DateTime @default(now())
  
  orders    Order[]
  cart      Cart?
}
```

### Product
```typescript
model Product {
  id          String   @id @default(uuid())
  title       String
  description String?
  price       Decimal
  category    Category
  image       String?  (Vercel Blob URL)
  createdAt   DateTime @default(now())
  
  orderItems  OrderItem[]
  cartItems   CartItem[]
}
```

### Order & Cart
- **Order** - Purchase history with user, items, total, status
- **Cart** - Current shopping cart per user
- **CartItem** - Items in cart with quantity
- **OrderItem** - Items purchased in order

### Gallery & Inquiries
- **GalleryItem** - Portfolio gallery items with images
- **ContactInquiry** - Form submissions from contact page

### Enums
```typescript
enum Role {
  USER
  ADMIN
}

enum Category {
  OIL
  ACRYLIC
  WATERCOLOR
  SKETCH
}

enum OrderStatus {
  PENDING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## 🔌 API Routes

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/auth/signin` - Login (handled by NextAuth)
- `POST /api/auth/session` - Get current session

### Cart Operations
- `GET /api/cart` - Fetch user's cart with items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart` - Update item quantity
- `DELETE /api/cart` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout (converts cart to order)

### Contact
- `POST /api/contact` - Submit contact form inquiry

All protected routes require valid NextAuth session.

---

## 🌐 Deployment

### Deploy to Vercel

**Easiest Method:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add Environment Variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)
6. Click "Deploy"
7. Vercel auto-deploys on every push to main

**GitHub Actions Integration:**
Once deployed, the `toggle-shop.yml` workflow can update Vercel env vars and trigger redeploys.

### Pre-deployment Checklist

```bash
# 1. Type check
npm run typecheck

# 2. Lint
npm run lint

# 3. Build
npm run build

# 4. Database sync
npx prisma generate
npm run db:push
```

### Environment Variables on Vercel

Set these in Vercel project settings:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for session signing
- `NEXTAUTH_URL` - Your production URL
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token
- `SHOP_ENABLED` - "ENABLE" or "DISABLE"

---

## 🐛 Troubleshooting

### Issue: "PrismaClientInitializationError"

**Cause:** DATABASE_URL not set or Prisma client not initialized properly

**Solution:**
```bash
# 1. Check .env.local
cat .env.local | grep DATABASE_URL

# 2. Regenerate Prisma client
npx prisma generate

# 3. Restart dev server
npm run dev
```

### Issue: Admin tab not showing locally

**Cause:** User role not set to ADMIN in database

**Solution:**
```bash
# Option 1: Direct SQL
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';

# Option 2: Prisma Studio
npx prisma studio
# Find user, set role to ADMIN
```

### Issue: Shop not showing after toggling

**Cause:** Environment variable not reloaded or deployment pending

**Solution:**
```bash
# Local: Update .env.local
SHOP_ENABLED=ENABLE

# Vercel: Wait for deployment to complete
# Check: https://vercel.com/deployments
```

### Issue: Images not uploading to Vercel Blob

**Cause:** Invalid BLOB_READ_WRITE_TOKEN

**Solution:**
1. Go to Vercel Dashboard → Blob Storage
2. Create or regenerate token
3. Update BLOB_READ_WRITE_TOKEN env var
4. Redeploy

### Issue: Cart not working after login

**Cause:** Session/authentication issue

**Solution:**
```bash
# Clear browser cookies
# Try incognito window
# Check NEXTAUTH_SECRET is set
```

---

## 🔄 Git Workflow

### Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# Test locally
npm run dev
npm run typecheck
npm run lint

# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### Deploy Feature Toggle Workflow

```bash
# Add workflow to repo
git add .github/workflows/toggle-shop.yml
git add lib/features.ts
git commit -m "feat: add SHOP feature toggle with GitHub Actions"
git push origin main

# Now available in GitHub Actions tab for manual triggering
```

---

## 📝 Notes & Future Enhancements

### Current Limitations
- Checkout is in development mode (no real payment processing)
- Shop can be toggled but requires GitHub Actions knowledge
- Admin role must be set manually in database

### Future Enhancements
- [ ] Real payment processing (Stripe/PayPal)
- [ ] Order status notifications via email
- [ ] Admin UI for toggling shop feature
- [ ] Advanced inventory management (stock tracking, low stock alerts)
- [ ] Search and advanced filtering
- [ ] Review/rating system
- [ ] Wishlist feature
- [ ] Multi-currency support
- [ ] Analytics dashboard

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review relevant code comments
3. Check Vercel/Prisma/NextAuth documentation

---

## 📄 License

This project is private. All rights reserved.

---

**Last Updated:** April 15, 2026
**Version:** 1.0.0



BUGS I want fixed:

1. title, date(mm/yyyy), category(
Murals & Spatial Art
Corporate Art Experiences
Weddings & Private Events
Commissioned Canvases
), on_homepage(Y)/N should be required fields for gallery items