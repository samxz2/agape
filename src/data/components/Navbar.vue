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
  window.location.href = '/?categoria=' + cat
  menuOpen.value = false
}

function buscar() {
  if (searchQuery.value.trim()) {
    window.location.href = '/?buscar=' + encodeURIComponent(searchQuery.value)
    searchOpen.value = false
  }
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'glass-dark shadow-lg border-b border-brown-500/20'
        : 'bg-brown-600'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 py-2.5">
      <div class="flex items-center justify-between gap-2">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2 shrink-0 group">
          <img
            src="https://i.ibb.co/CpHdX08t/1001879919.png"
            alt="Agape Collection Parfum"
            class="h-8 w-auto md:h-10 transition-all duration-300 group-hover:scale-105"
            onerror="this.style.display='none'"
          />
          <div class="flex flex-col leading-tight">
            <span class="font-playfair text-sm md:text-base text-cream-50 font-bold tracking-wider">
              Agape
            </span>
            <span class="text-gold-300/80 text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-light">
              Parfum
            </span>
          </div>
        </a>

        <!-- Categories - Desktop -->
        <nav class="hidden md:flex items-center gap-0.5 flex-1 justify-center mx-4">
          <a href="/" class="text-cream-200/80 hover:text-cream-50 text-xs px-3 py-1.5 rounded-xl hover:bg-brown-500/50 transition-all">
            Inicio
          </a>
          <button v-for="cat in categorias" :key="cat.value" @click="irACategoria(cat.value)" class="text-cream-200/80 hover:text-cream-50 text-xs px-3 py-1.5 rounded-xl hover:bg-brown-500/50 transition-all cursor-pointer">
            {{ cat.label }}
          </button>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-1">
          <button @click="searchOpen = !searchOpen" class="text-cream-200 hover:text-cream-50 transition-colors p-1.5 rounded-xl hover:bg-brown-500/50 cursor-pointer">
            <Search :size="18" />
          </button>

          <CurrencyToggle />

          <button @click="cart.toggleCart()" class="relative text-cream-200 hover:text-cream-50 transition-colors p-1.5 rounded-xl hover:bg-brown-500/50 cursor-pointer">
            <ShoppingBag :size="20" />
            <span v-if="cart.totalItems > 0" class="absolute -top-0.5 -right-0.5 bg-gold-400 text-brown-800 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
              {{ cart.totalItems }}
            </span>
          </button>

          <button @click="menuOpen = !menuOpen" class="md:hidden text-cream-200 hover:text-cream-50 transition-colors p-1.5 rounded-xl hover:bg-brown-500/50 cursor-pointer">
            <Menu v-if="!menuOpen" :size="20" />
            <X v-else :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div v-if="searchOpen" class="border-t border-brown-500/30 px-4 py-3 bg-brown-600">
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="buscar" class="flex gap-2">
          <div class="relative flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar perfume..."
              class="w-full bg-brown-700/80 text-cream-50 placeholder-cream-300/50 rounded-xl pl-4 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold-400/30 border border-brown-500/50 focus:border-gold-400/30 transition-all"
              autofocus
            />
            <Search :size="18" class="absolute right-3 top-1/2 -translate-y-1/2 text-cream-300/40" />
          </div>
          <button type="submit" class="gold-gradient-bg text-brown-800 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer">
            Buscar
          </button>
        </form>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 top-[52px] z-40 bg-black/40 backdrop-blur-sm md:hidden"
      @click="menuOpen = false"
    />

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="fixed left-0 right-0 top-[52px] z-50 bg-brown-600 border-t border-brown-500/30 md:hidden max-h-[calc(100vh-52px)] overflow-y-auto"
    >
      <div class="px-4 py-4 space-y-1">
        <a
          href="/"
          @click="menuOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-cream-200 hover:text-cream-50 hover:bg-brown-500/50 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span class="font-medium">Inicio</span>
        </a>

        <div class="h-px bg-brown-500/30 my-2" />

        <p class="px-4 py-2 text-xs text-cream-300/60 uppercase tracking-wider font-semibold">
          Categorías
        </p>

        <button
          v-for="cat in categorias"
          :key="cat.value"
          @click="irACategoria(cat.value)"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-cream-200 hover:text-cream-50 hover:bg-brown-500/50 transition-all text-left cursor-pointer"
        >
          <span class="font-medium">{{ cat.label }}</span>
        </button>
      </div>
    </div>
  </header>
</template>