# Payman AI Redesign

A standalone static prototype for the Payman AI marketing-site redesign.

## Run locally

Serve the repository root with any static HTTP server. For example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

The project is configured as a static site for Vercel. Import this repository
in Vercel and deploy with the default settings; no build command is required.

## Project structure

- `index.html` — page markup and content
- `css/payman.css` — responsive styling
- `js/payman.js` — interactions and animation
- `assets/images/paymanai/` — site imagery, logos, and product demo video
