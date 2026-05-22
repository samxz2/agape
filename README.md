# Agape Collection Parfum

Perfumería online para el mercado venezolano. Catálogo de fragancias de caballero, damas, unisex y sets. Carrito con persistencia local, cambio de moneda USD/BS y pedidos por WhatsApp.

## Stack

- **Astro 6** — SSG + layout
- **Vue 3** + **Pinia** — componentes interactivos y estado global
- **Tailwind CSS v4** — estilos con tema personalizado
- **lucide-vue-next** — iconos

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Build a `./dist/` |
| `npm run preview` | Vista previa del build |

No hay scripts de lint ni typecheck.

## Estructura

```
src/
├── components/   → Vue SFC (Navbar, CartDrawer, ProductCard, etc.)
├── composables/  → useDevice.ts
├── data/         → productos.ts (array estático con interfaz Producto)
├── layouts/      → Layout.astro
├── pages/        → index.astro (SPA)
├── plugins/      → pinia.ts (instancia explícita)
├── stores/       → cartStore.ts + currencyStore.ts
└── styles/       → global.css (tema Tailwind)
```

## Arquitectura

- Página única con filtrado por categoría/búsqueda vía `URLSearchParams`
- Pinia debe importarse con la instancia explícita: `useXxxStore(pinia)`
- Moneda fija a 700 Bs/USD, toggle sincronizado entre stores
- Carrito persiste en localStorage bajo clave `agape-cart-items`
- Checkout genera mensaje de WhatsApp al `+584127050149`
- Modales responsive: `ProductModalMobile.vue` (<768px) y `ProductModalDesktop.vue` (>=768px)
