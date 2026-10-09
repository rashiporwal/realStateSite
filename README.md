# envSites

A minimalist, editorial real-estate experience for discovering and listing homes across India.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The generated `dist/` folder can be deployed directly to Vercel, Netlify, GitHub Pages, or any static host.

## Deploy to Vercel

Import the repository in Vercel. It will detect Vite automatically. Build command: `npm run build`; output directory: `dist`.

## Deploy to GitHub Pages

Push this repository to GitHub on the `main` branch, then open **Settings → Pages** and select **GitHub Actions** as the source. The included workflow builds and deploys the site automatically on every push to `main`.

## Features

- Responsive desktop, tablet, and mobile layout
- Light/dark theme persistence
- India city search with dynamic property results
- Seller registration stored locally in the browser
- Buy/sell enquiry flows
- Saved shortlists, property detail views, and enquiry references
- Motion-powered transitions with reduced-motion support
