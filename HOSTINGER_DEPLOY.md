# GitHub and Hostinger Deployment Guide

This project is a `Next.js 14` app with:

- App Router pages
- server-side data fetching from Strapi
- a NextAuth API route at `src/app/api/auth/[...nextauth]/route.ts`

That means it is **not a plain static HTML site**. For Hostinger, you should use one of these paths:

## Option 1: Hostinger Node.js / VPS

Use this if you want the full project to run on Hostinger with login and API features.

What you need:

- a Hostinger plan that supports Node.js apps or a VPS
- your Strapi backend URL
- production environment variables

Recommended environment variables:

- `NEXT_PUBLIC_STRAPI_URL`
- `STRAPI_API_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` if Google login is enabled

Basic deploy flow:

1. Push this project to GitHub.
2. In Hostinger, create a Node.js app or connect the VPS project.
3. Clone the GitHub repository on the server.
4. Run `npm install`.
5. Set the environment variables in Hostinger.
6. Run `npm run build`.
7. Start the app with `npm run start`.
8. Point your domain to the Hostinger app.

## Option 2: Shared Hosting Only

Use this only if your Hostinger plan does **not** support Node.js.

Important limitation:

- shared hosting is usually not suitable for this project as-is
- `NextAuth` and server-rendered Next.js routes need a Node.js runtime
- in this setup, login and server features will not work unless the app is rewritten as a static export

If your plan is shared hosting only, the safer solution is:

1. keep this frontend on a Node-friendly platform like Vercel
2. keep Strapi on Hostinger VPS or another backend host
3. connect your custom domain to the frontend deployment

## Push to GitHub

If Git is not initialized yet, run:

```bash
git init -b main
git add .
git commit -m "Initial commit"
```

Then create an empty GitHub repository and connect it:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Before Production

Check these items before going live:

- `.env.local` is not committed
- real API tokens are not committed
- production domain is set in `NEXT_PUBLIC_SITE_URL`
- `NEXTAUTH_URL` matches the real domain
- `NEXTAUTH_SECRET` is changed to a strong secret
- Strapi CORS and auth settings allow the frontend domain

## Recommended Setup

For this codebase, the most reliable deployment is:

- frontend: Vercel or Hostinger Node.js/VPS
- backend: Strapi on VPS
- git hosting: GitHub
