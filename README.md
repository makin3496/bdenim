# BDENIM Frontend

Next.js 14 frontend for the BDENIM storefront, designed to consume content from a Strapi backend.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Strapi CMS as the content source

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env.local
```

3. Update `.env.local` with your local Strapi values.

Required variables:

- `NEXT_PUBLIC_STRAPI_URL`
- `STRAPI_API_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and Run

```bash
npm run build
npm run start
```

## Strapi Notes

The frontend expects Strapi content for homepage, services, blog posts, and site settings. Detailed backend setup notes are in [STRAPI_SETUP.md](./STRAPI_SETUP.md).

## GitHub Safety

- Do not commit `.env.local`.
- Do not commit real API tokens or local credentials.
- Keep `.env.example` as placeholders only.

## Vercel Deployment

High-level deployment flow:

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Configure the same environment variables from `.env.example` in the Vercel project settings.
4. Set `NEXT_PUBLIC_STRAPI_URL` to your production Strapi URL.
5. Deploy the frontend.

If your Strapi instance requires authenticated requests in production, also set `STRAPI_API_TOKEN` in Vercel.

## GitHub and Hostinger

For GitHub push and Hostinger deployment notes, see [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md).
