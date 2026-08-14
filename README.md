# JARVIS Vision

A Vercel-ready Next.js app that discovers `.ply` Gaussian splats in Cloudflare R2 and streams each object through the existing WebGL viewer.

## Configure Cloudflare R2

1. Create an R2 bucket and an API token with **Object Read** permission for it.
2. In Vercel, add the environment variables in [`.env.example`](.env.example). Do not use a public `NEXT_PUBLIC_` prefix for credentials.
3. In the bucket's **Settings → CORS Policy**, add:

```json
[
  {
    "AllowedOrigins": [
      "https://jarvis-splat.vercel.app",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Type", "ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

4. Upload `.ply` files directly in the bucket root. The filename becomes its library entry.
5. Deploy with Vercel. The project already provides the standard `npm run build` command.

The viewer page creates a one-hour signed URL on the server. The browser then downloads the `.ply` file directly from R2, so large files do not pass through a Vercel function and R2 credentials remain server-side.

## Local development

```bash
npm install
copy .env.example .env.local
# Add your R2 values to .env.local
npm run dev
```
