# Agape Collection Parfum — E-commerce

**Astro 6 + Vue 3 + Pinia + Tailwind CSS v4** — Single-page perfume store (Venezuelan market, Spanish UI).

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI (e.g. `astro add`, `astro check`) |

No lint, typecheck, or test scripts exist.

## Architecture

- **Single page:** `src/pages/index.astro` — categories, search, and filtering handled client-side via `URLSearchParams` in `ProductGrid.vue`. Product detail modals triggered by `?producto=N` query param.
- **Interactive Vue components** all use `client:load` (Navbar, CartDrawer, ProductGrid) — they hydrate immediately on page load.
- **Astro is static** by default (no `output: 'server'`). All interactivity is client-side Vue.
- **Pinia stores** must use the explicit instance:
  ```ts
  import { pinia } from '../plugins/pinia'
  const store = useXxxStore(pinia)
  ```
- **Cross-store sync:** `currencyStore.toggleCurrency()` calls `cartStore.setCurrency()` internally — no external wiring needed.
- **Products:** Static array in `src/data/productos.ts` with typed `Producto` interface (4 categories: `caballero | dama | unisex | sets`).
- **Shared constants** in `src/data/constants.ts` (e.g. `FALLBACK_IMAGE` SVG data URI) — import instead of duplicating.
- **`.env` defaults** hardcoded in `src/data/config.ts` — `TASA_CAMBIO = 700`, `WHATSAPP_NUMERO = '584127050149'`. `.env` is gitignored.
- **Cart persisted** to localStorage under key `agape-cart-items`.
- **Checkout** generates WhatsApp message to `+584127050149` with order details.
- **Device-responsive modals:** `ProductModalMobile.vue` (<768px) and `ProductModalDesktop.vue` (>=768px), chosen via `window.innerWidth` check in `ProductCard.vue` composable.

## Conventions

- **CSS:** Tailwind v4 with custom theme in `src/styles/global.css` (`@theme` block: `cream-{50..400}`, `brown-{50..900}`, `gold-{300,400}`; Playfair Display + Lato fonts).
- **Typography:** Headings use `font-playfair`, body uses Lato (default via `font-lato` on `body`).
- **No lint/typecheck** — Astro's strict tsconfig applies at build time only.
- **Node >=22.12.0** required.
