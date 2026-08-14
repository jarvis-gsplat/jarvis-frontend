# JARVIS Vision

A Vercel-ready Next.js app that discovers `.ply` Gaussian splats in Cloudflare R2 and streams each object through the existing WebGL viewer.

## Configure Cloudflare R2

1. Create an R2 bucket and an API token with **Object Read** permission for it.
2. In Vercel, add the environment variables in [`.env.example`](.env.example). Do not use a public `NEXT_PUBLIC_` prefix for credentials.
3. Upload `.ply` files directly in the bucket root. The filename becomes its library entry.
4. Deploy with Vercel. The project already provides the standard `npm run build` command.

The browser requests `/api/splats/<object-key>` only. That route validates the prefix, fetches from R2, and streams the object with its content length, so credentials stay server-side.

## Local development

```bash
npm install
copy .env.example .env.local
# Add your R2 values to .env.local
npm run dev
```
