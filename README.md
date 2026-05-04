# Niki Keramik

Professional bilingual website and quote-request system for Niki Keramik.

## Stack

- Next.js App Router
- Tailwind CSS
- TypeScript
- Prisma
- PostgreSQL
- Vercel-ready environment variables

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and set:

   ```bash
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/niki_keramik?schema=public"
   ADMIN_PASSWORD="change-this-password"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

3. Create the database tables:

   ```bash
   npx prisma migrate dev
   ```

4. Run the site:

   ```bash
   npm run dev
   ```

For production database migrations:

```bash
npx prisma migrate deploy
```

## Routes

- `/` public homepage
- `/sherbimet` services
- `/punimet` public database-backed gallery with filters and lightbox
- `/oferta` quote request form
- `/rreth-nesh` about
- `/kontakt` contact
- `/admin` protected quote dashboard
- `/admin/gallery` protected project photo management
- `/admin/login` admin login

## Notes

Quote photos are saved under `public/uploads/quotes` and gallery photos under `public/uploads/gallery` for local development. For Vercel production, connect persistent file storage such as Vercel Blob, Cloudinary, Supabase Storage, or S3 before relying on uploaded photos long term. The storage boundary is isolated in `lib/storage.ts`.

Gallery projects are managed from `/admin/gallery`. Admin can upload, edit, replace, delete, categorize, feature, place in the homepage hero, add before/after images, and set priority ordering without code changes.
