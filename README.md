

# Skylar Dreams – AI Future Self Kiosk

Skylar Dreams is an interactive AI-powered kiosk/web app that lets students see their **“future self”** in different careers.

Users capture or upload a photo, select (or describe) a dream job, and the app calls **Google Gemini 2.5 Flash Image** to transform their photo into a high‑quality, photorealistic image matching that career.

---

## Features

- **Attract screen** with animated hero section to draw users in.
- **Live camera capture** with countdown and selfie-style mirror preview.
- **Photo upload** support with automatic resize/normalization.
- **Career dream presets** like Doctor, Engineer, Scientist, IAS, CA, IPS, Army, Air Force Pilot, and more.
- **Nested categories** (e.g. Engineering → Civil / Software / Electrical / Chemical).
- **Custom Dream mode** where users can type any description they imagine.
- **AI-powered image transformation** using Google Gemini 2.5 Flash Image.
- **Result view** with branding overlay, download button, and lead capture (phone number).

---

## Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Icons:** lucide-react
- **Styling:** Utility classes (Tailwind-style)
- **AI:** `@google/genai` (Google Gemini)

---

## Prerequisites

- **Node.js** (LTS recommended)
- A **Google Gemini API key** with access to the image model `gemini-2.5-flash-image` (or compatible)

---

## Environment Variables

Create a file named **`.env.local`** in the project root (same level as `package.json`) and add:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

The Vite config exposes this value to the app as `process.env.API_KEY` / `process.env.GEMINI_API_KEY` for the Gemini client.

> **Important:** Never commit your real API keys to Git or share them publicly.

---

## Install & Run Locally

From the project root:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Create `.env.local`
   - Set `GEMINI_API_KEY` as shown above

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (by default: `http://localhost:3000`).

---

## Build for Production

To create an optimized production build:

```bash
npm run build
```

You can then serve the built files from the `dist` folder using any static hosting provider or a simple Node/NGINX setup.

---

## Notes

- Designed to work nicely on **touch screens / kiosks** and mobile devices.
- Image generation relies on the availability and quota of your **Gemini API key**.
- For real deployments, you may want to:
  - Add proper **logging/analytics**.
  - Plug the lead form into your **CRM** or backend.
  - Add **rate limiting** or auth if exposed publicly.

