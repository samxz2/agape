// Pinia (su dist ESM) lee el flag de build de Vue __VUE_PROD_DEVTOOLS__ como
// variable global. Astro no lo inyecta en el prerender (SSR) y pinia se
// externaliza, así que lo fijamos a false (producción) antes de crear la
// instancia. En el bundle del cliente Vite lo sustituye en build-time.
;(globalThis as Record<string, unknown>).__VUE_PROD_DEVTOOLS__ = false

import { createPinia } from 'pinia'

export const pinia = createPinia()
