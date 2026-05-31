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
  { label: 'Caballero', value: 'caballero', svg: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8' },
  { label: 'Damas', value: 'dama', svg: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M12 1v4 M12 19v4 M4.22 4.22l2.83 2.83 M16.95 16.95l2.83 2.83 M1 12h4 M19 12h4 M4.22 19.78l2.83-2.83 M16.95 7.05l2.83-2.83' },
  { label: 'Unisex', value: 'unisex', svg: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { label: 'Sets', value: 'sets', svg: 'M3 8h18v12H3z M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2 M12 6v14 M8 6V4 M16 6V4' },
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
  const url = new URL(window.location.href)
  url.searchParams.set('categoria', cat)
  url.searchParams.delete('buscar')
  window.history.pushState({}, '', url.toString())
  window.dispatchEvent(new CustomEvent('categoria-change', { detail: cat }))
  menuOpen.value = false
}

function buscar() {
  if (searchQuery.value.trim()) {
    const url = new URL(window.location.href)
    url.searchParams.set('buscar', searchQuery.value)
    url.searchParams.delete('categoria')
    window.history.pushState({}, '', url.toString())
    window.dispatchEvent(new CustomEvent('buscar-change', { detail: searchQuery.value }))
    searchOpen.value = false
  }
}
</script>

<template>
  <header 
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled ? 'glass-light shadow-sm' : 'bg-cream-100/80'
    ]"
  >
    <!-- Main Navbar -->
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-2">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 shrink-0 group">
          <img 
            src="https://i.ibb.co/CpHdX08t/1001879919.png" 
            alt="Agape Collection Parfum"
            class="h-8 w-auto md:h-10 rounded-full transition-transform duration-300 group-hover:scale-105"
            onerror="this.style.display='none'"
          />
          <div class="flex flex-col leading-tight">
            <span class="font-playfair text-sm md:text-lg text-brown-700 font-bold tracking-tight">
              Agape
            </span>
            <span class="text-brown-400/70 text-[9px] md:text-[11px] tracking-[0.3em] uppercase font-medium">
              Parfum
            </span>
          </div>
        </a>

        <!-- Categories - Desktop -->
        <nav class="hidden md:flex items-center gap-1 flex-1 justify-center mx-4">
          <a href="/" class="text-brown-600 text-xs px-3.5 py-2 rounded-lg border-2 border-brown-300/60 hover:border-brown-500 hover:bg-brown-100/50 transition-all font-semibold">
            Inicio
          </a>
          <button v-for="cat in categorias" :key="cat.value" @click="irACategoria(cat.value)" class="text-brown-600 text-xs px-3.5 py-2 rounded-lg border-2 border-brown-300/60 hover:border-brown-500 hover:bg-brown-100/50 transition-all cursor-pointer font-semibold">
            {{ cat.label }}
          </button>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-1">
          <!-- Search toggle -->
          <button @click="searchOpen = !searchOpen" class="text-brown-500 hover:text-brown-700 transition-colors p-2 rounded-lg hover:bg-brown-100/50 cursor-pointer">
            <Search :size="18" />
          </button>

          <!-- Currency Toggle -->
          <CurrencyToggle />

          <!-- Cart -->
          <button @click="cart.toggleCart()" class="relative text-brown-500 hover:text-brown-700 transition-colors p-2 rounded-lg hover:bg-brown-100/50 cursor-pointer">
            <ShoppingBag :size="20" />
            <span v-if="cart.totalItems > 0" class="absolute -top-0.5 -right-0.5 bg-brown-600 text-cream-50 text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-md">
              {{ cart.totalItems }}
            </span>
          </button>

          <!-- Hamburger Mobile -->
          <button @click="menuOpen = !menuOpen" class="md:hidden text-brown-500 hover:text-brown-700 transition-colors p-2 rounded-lg hover:bg-brown-100/50 cursor-pointer">
            <Menu v-if="!menuOpen" :size="20" />
            <X v-else :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <Transition name="slide-down">
      <div
        v-if="searchOpen"
        class="border-t border-cream-200/50 bg-cream-50/95 backdrop-blur-md px-4 py-3"
      >
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="buscar" class="flex gap-2">
          <div class="relative flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar perfume..."
              class="w-full bg-cream-100 text-brown-700 placeholder-brown-300/60 rounded-xl pl-4 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold-300/40 border border-cream-200/80"
              autofocus
            />
            <Search :size="18" class="absolute right-3 top-1/2 -translate-y-1/2 text-brown-300/60" />
          </div>
          <button type="submit" class="bg-brown-600 text-cream-50 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-brown-500 transition-colors cursor-pointer">
            Buscar
          </button>
        </form>
      </div>
    </div>
    </Transition>

    <!-- Mobile Menu Overlay -->
    <Transition name="fade">
      <div
        v-if="menuOpen"
        class="fixed inset-0 top-[61px] z-40 bg-brown-900/20 backdrop-blur-sm md:hidden"
        @click="menuOpen = false"
      />
    </Transition>

    <!-- Mobile Menu -->
    <Transition name="slide-down-menu">
      <div
        v-if="menuOpen"
        class="fixed left-0 right-0 top-[61px] z-50 bg-cream-50 border-t border-cream-200 shadow-xl md:hidden max-h-[calc(100vh-61px)] overflow-y-auto"
      >
      <div class="px-4 py-4 space-y-1">
        <a
          href="/"
          @click="menuOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-brown-600 hover:text-brown-700 hover:bg-cream-200/50 transition-all font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Inicio</span>
        </a>

        <div class="h-px bg-cream-200/80 my-2" />

        <p class="px-4 py-2 text-xs text-brown-400/70 uppercase tracking-wider font-semibold">
          Categorías
        </p>

        <button
          v-for="cat in categorias"
          :key="cat.value"
          @click="irACategoria(cat.value)"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-brown-600 hover:text-brown-700 hover:bg-cream-200/50 border border-cream-200/60 hover:border-brown-300 transition-all text-left cursor-pointer font-medium"
        >
          <span>{{ cat.label }}</span>
        </button>
      </div>
    </div>
    </Transition>
  </header>
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
