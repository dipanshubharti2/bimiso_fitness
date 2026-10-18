# BOMISO FITNESS – Premium Gym & Wellness Club

> **BODY · MIND · SOUL**  
> Official Web Application for BOMISO FITNESS, Gurugram, Haryana, India.

---

## 🚀 GitHub Hosting & Deployment

This codebase is configured for GitHub Pages and static hosting platforms:

1. **Self-Contained Unified Frontend**: All components, modals, typed data, authentication provider, and AI assistant logic are consolidated into `src/App.tsx` for simple portability and version management.
2. **Relative Path Asset Resolution**: `vite.config.ts` includes `base: './'` so static builds deploy smoothly under repository subpaths (e.g., `https://<username>.github.io/<repo-name>/`) without broken asset links.
3. **Automated GitHub Pages Workflow**: Includes `.github/workflows/deploy.yml` for automated CI/CD deployment on push to `main`.
4. **Client-Side Hybrid Fallback**:
   - **Member Authentication**: Connects to the Express backend when running full-stack, with local storage fallbacks for static GitHub Pages.
   - **BOMISO AI Concierge**: Connects to the Gemini API (`gemini-3.8-flash`) via the backend proxy when available, and automatically falls back to an intelligent client-side knowledge engine for static hosting environments.
   - **Direct WhatsApp Concierge**: Instant booking and enquiries routed to `+91 99106 65194`.

---

## 📍 Gurugram Club Locations

- **M3M Tee Point (Sector 65)**: 3rd Floor, South Block, Golf Course Extension Road
- **Good Earth City Centre (Sector 50)**: 2nd Floor, Malibu Towne
- **DLF Star Mall (Sector 30)**: LG 06, NH 8

---

## 🛠️ Local Development & Build

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (with full-stack API and live Vite dev server)
npm run dev

# 3. Build optimized static bundle for GitHub Pages / hosting
npm run build

# 4. Preview static build locally
npm run preview
```

---

## 📦 Project Structure

```
├── .github/workflows/deploy.yml  # Zero-config GitHub Pages CI/CD workflow
├── index.html                    # SEO tags, OpenGraph, JSON-LD schema
├── server.ts                     # Express server & Gemini API proxy
├── src/
│   ├── assets/images/            # High-resolution optimized brand photography
│   ├── App.tsx                   # Unified, single-file complete application
│   ├── index.css                 # Tailwind CSS v4 styling & typography
│   └── main.tsx                  # React 19 entry point
├── package.json
└── vite.config.ts                # Vite config with relative path base
```
