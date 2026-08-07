<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { pinia } from '../plugins/pinia'
import { ShoppingBag, Search, Menu, X } from 'lucide-vue-next'
import CurrencyToggle from './CurrencyToggle.vue'

const cart = useCartStore(pinia)
const menuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const isScrolled = ref(false)

const categorias = [
  { label: 'Caballero', value: 'caballero' },
  { label: 'Damas', value: 'dama' },
  { label: 'Unisex', value: 'unisex' },
  { label: 'Sets', value: 'sets' },
]

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function irACategoria(cat: string) {
  // Las categorías solo existen en la home: si estamos en otra página, navegar ahí.
  if (window.location.pathname !== '/') {
    window.location.href = `/?categoria=${encodeURIComponent(cat)}`
    return
  }
  const url = new URL(window.location.href)
  url.searchParams.set('categoria', cat)
  url.searchParams.delete('buscar')
  window.history.pushState({}, '', url.toString())
  window.dispatchEvent(new CustomEvent('categoria-change', { detail: cat }))
  menuOpen.value = false
}

function buscar() {
  const query = searchQuery.value.trim()
  if (query) {
    // La búsqueda solo existe en la home: si estamos en otra página, navegar ahí.
    if (window.location.pathname !== '/') {
      window.location.href = `/?buscar=${encodeURIComponent(query)}`
      return
    }
    const url = new URL(window.location.href)
    url.searchParams.set('buscar', query)
    url.searchParams.delete('categoria')
    window.history.pushState({}, '', url.toString())
    window.dispatchEvent(new CustomEvent('buscar-change', { detail: query }))
    searchOpen.value = false
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-4 px-3 pointer-events-none"
  >
    <!-- Pill -->
    <div
      class="pointer-events-auto w-full max-w-5xl transition-all duration-500 rounded-full"
      :class="isScrolled
        ? 'bg-cream-50/80 backdrop-blur-xl shadow-lg border border-cream-200/50'
        : 'bg-white/70 backdrop-blur-xl shadow-sm border border-white/30'"
    >
      <div class="flex items-center justify-between gap-2 px-4 md:px-6 py-2 md:py-2.5">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 shrink-0 group">
          <img
            src="https://i.ibb.co/CpHdX08t/1001879919.png"
            alt="Agape Collection Parfum"
            class="h-8 w-auto md:h-9 rounded-full transition-transform duration-300 group-hover:scale-105"
            onerror="this.style.display='none'"
          />
          <div class="flex flex-col leading-tight">
            <span class="font-playfair text-sm md:text-base text-brown-700 font-bold tracking-tight">
              Agape
            </span>
          </div>
        </a>

        <!-- Categories - Desktop -->
        <nav class="hidden md:flex items-center gap-1">
          <a
            href="/"
            class="text-brown-500 hover:text-brown-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-brown-100/60 transition-all"
          >
            Inicio
          </a>
          <button
            v-for="cat in categorias"
            :key="cat.value"
            @click="irACategoria(cat.value)"
            class="text-brown-500 hover:text-brown-700 text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-brown-100/60 transition-all cursor-pointer"
          >
            {{ cat.label }}
          </button>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-0.5">
          <button
            @click="searchOpen = !searchOpen"
            class="text-brown-500 hover:text-brown-700 transition-colors p-2 rounded-full hover:bg-brown-100/60 cursor-pointer"
          >
            <Search :size="17" />
          </button>
          <CurrencyToggle />
          <button
            @click="cart.toggleCart()"
            class="relative text-brown-500 hover:text-brown-700 transition-colors p-2 rounded-full hover:bg-brown-100/60 cursor-pointer"
          >
            <ShoppingBag :size="19" />
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-0.5 -right-0.5 bg-gold-400 text-brown-800 text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-md"
            >
              {{ cart.totalItems }}
            </span>
          </button>
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden text-brown-500 hover:text-brown-700 transition-colors p-2 rounded-full hover:bg-brown-100/60 cursor-pointer"
          >
            <Menu v-if="!menuOpen" :size="19" />
            <X v-else :size="19" />
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <Transition name="slide-down">
        <div v-if="searchOpen" class="border-t border-cream-200/40 px-4 md:px-6 pb-3 pt-2">
          <div class="max-w-2xl mx-auto">
            <form @submit.prevent="buscar" class="flex gap-2">
              <div class="relative flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar perfume..."
                  class="w-full bg-cream-100/80 text-brown-700 placeholder-brown-300/60 rounded-full pl-4 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-gold-300/40 border border-cream-200/60"
                  autofocus
                />
                <Search :size="16" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown-300/60" />
              </div>
              <button type="submit" class="bg-gold-400 text-brown-800 px-5 py-2 rounded-full text-sm font-bold hover:bg-gold-300 transition-colors cursor-pointer">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </header>

  <!-- Overlay menú (z-index mayor que el header) -->
  <Transition name="fade">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-[60] bg-brown-900/20 backdrop-blur-sm md:hidden"
      @click="menuOpen = false"
    />
  </Transition>

  <!-- Menú móvil (z-index mayor que el overlay) -->
  <Transition name="slide-down-menu">
    <div
      v-if="menuOpen"
      class="fixed left-3 right-3 top-20 z-[70] md:hidden"
    >
      <div class="bg-cream-50/95 backdrop-blur-xl border border-cream-200/60 rounded-2xl shadow-xl overflow-hidden">
        <div class="px-4 py-4 space-y-1">
          <a
            href="/"
            @click="menuOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-full text-brown-600 hover:text-brown-700 hover:bg-cream-200/50 transition-all font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Inicio</span>
          </a>

          <div class="h-px bg-cream-200/60 my-2" />

          <p class="px-4 py-2 text-xs text-brown-400/70 uppercase tracking-wider font-semibold">
            Categorías
          </p>

          <button
            v-for="cat in categorias"
            :key="cat.value"
            @click="irACategoria(cat.value)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-full text-brown-600 hover:text-brown-700 hover:bg-cream-200/50 border border-cream-200/40 hover:border-brown-300 transition-all text-left cursor-pointer font-medium"
          >
            <span>{{ cat.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 120px;
}

.slide-down-menu-enter-active {
  transition: all 0.3s ease-out;
}
.slide-down-menu-leave-active {
  transition: all 0.2s ease-in;
}
.slide-down-menu-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.slide-down-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
