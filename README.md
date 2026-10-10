# envSites

envSites is a modern real-estate discovery experience designed for people looking to buy, explore, or list thoughtfully selected homes across India.

The project focuses on clarity, calm visuals, useful property information, and a smoother journey from the first search to a viewing request. Its warm editorial design combines minimal layouts, subtle glass effects, responsive motion, and carefully balanced light and dark themes.

## What visitors can do

- Search for homes by Indian city, property type, and budget.
- Explore individual property details, specifications, and availability context.
- Experience interactive 360° property tours with drag, zoom, and fullscreen controls.
- Save preferred properties and review a personal shortlist.
- Request a property viewing through a structured enquiry flow.
- Register a property for sale and receive a listing reference.
- Contact the team for buying as well as selling requirements.
- Switch between light and dark modes with the preference remembered locally.

## Live experience

[Visit envSites](https://rashiporwal.github.io/realStateSite/)

## 360° property experience

Every featured property includes its own interior panorama. Tours are loaded only when requested, so the main browsing experience remains lightweight.

Smaller optimized panorama files are served on mobile and lower-capability devices, while larger displays receive a higher-detail version. Only one viewer runs at a time and it is removed from memory when the tour is closed.

## Design direction

envSites uses a warm ivory, bronze, charcoal, and soft-white palette. The interface is intentionally spacious and understated, with layered shadows, glass surfaces, gentle transitions, and accessible reduced-motion behaviour.

The experience is responsive across phones, tablets, laptops, and large desktop displays.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Production build

```bash
npm run build
```

The generated `dist` directory contains the production-ready website.

## Deployment

The repository includes an automated GitHub Pages deployment workflow. Updates pushed to the `main` branch are built and published automatically.

The project can also be hosted on services that support standard static-site deployments.

## Project note

The current property catalogue is demonstration content. Saved homes, enquiry references, and seller submissions are retained in the visitor's browser for the prototype experience. A production launch should connect these flows to authenticated storage, verified property records, and a secure customer-management system.


