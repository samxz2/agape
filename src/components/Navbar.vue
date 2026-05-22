<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
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
  {
    label: 'Caballero',
    value: 'caballero',
    paths: [
      'M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
      'M2 22c0-5 5-8 10-8s10 3 10 8'
    ]
  },
  {
    label: 'Damas',
    value: 'dama',
    paths: [
      'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      'M6 21v-6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v6',
      'M8 14s-2-2-4-2',
      'M16 14s2-2 4-2',
      'M9 5a3 3 0 0 1 6 0'
    ]
  },
  {
    label: 'Unisex',
    value: 'unisex',
    paths: [
      'M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z',
      'M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z',
      'M5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z'
    ]
  },
  {
    label: 'Sets',
    value: 'sets',
    paths: [
      'M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2',
      'M3 8v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8',
      'M12 6v14'
    ]
  },
]

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function irACategoria(cat: string) {
  window.location.href = `/?categoria=${cat}`
  menuOpen.value = false
}

function buscar() {
  if (searchQuery.value.trim()) {
    window.location.href = `/?buscar=${encodeURIComponent(searchQuery.value)}`
    searchOpen.value = false
  }
}
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-500',
      isScrolled
        ? 'bg-brown-900/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)]'
        : 'bg-brown-900'
    ]"
  >
    <!-- TOP ROW -->
    <div class="max-w-7xl mx-auto px-4 py-2">
      <div class="flex items-center justify-between gap-2">

        <!-- LOGO -->
        <a href="/" class="flex items-center gap-2 shrink-0">
          <img
            src="https://i.ibb.co/CpHdX08t/1001879919.png"
            alt="Agape Collection"
            class="h-8 md:h-10 w-auto drop-shadow-lg"
            onerror="this.style.display='none'"
          />
          <div class="leading-tight">
            <h1 class="font-playfair text-xs md:text-base text-cream-50 font-bold tracking-wide">
              Agape Collection
            </h1>
            <p class="text-[8px] md:text-[10px] uppercase tracking-[0.35em] text-cream-300/70">
              Parfum
            </p>
          </div>
        </a>

        <!-- CATEGORIAS (desktop, in place of search) -->
        <div class="hidden md:flex flex-1 items-center justify-center gap-1">
          <button
            v-for="cat in categorias"
            :key="cat.value"
            @click="irACategoria(cat.value)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-cream-200 hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path v-for="path in cat.paths" :key="path" :d="path"/>
            </svg>
            {{ cat.label }}
          </button>
        </div>

        <!-- ACTIONS -->
        <div class="flex items-center gap-1">
          <CurrencyToggle />

          <!-- SEARCH toggle (desktop + mobile) -->
          <button
            @click="searchOpen = !searchOpen"
            class="text-cream-200 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
            :class="{ 'bg-white/10 text-white': searchOpen }"
          >
            <Search :size="18" />
          </button>

          <!-- CART -->
          <button
            @click="cart.toggleCart()"
            class="relative text-cream-200 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
          >
            <ShoppingBag :size="19" />
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-1 -right-1 bg-gold-300 text-brown-900 text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 shadow-lg"
            >
              {{ cart.totalItems }}
            </span>
          </button>

          <!-- HAMBURGER (mobile) -->
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden text-cream-200 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
          >
            <Menu v-if="!menuOpen" :size="20" />
            <X v-else :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- SEARCH BAR (desktop always visible, mobile collapsible) -->
    <div
      class="border-t border-white/5 bg-brown-900/95 backdrop-blur-xl"
      :class="searchOpen ? 'block' : 'hidden md:block'"
    >
      <div class="max-w-3xl mx-auto px-4 py-2">
        <form @submit.prevent="buscar" class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar perfume por nombre..."
            class="w-full bg-white/5 border border-white/10 focus:border-gold-300/50 text-cream-100 placeholder:text-cream-300/40 rounded-full pl-10 pr-4 py-2 text-xs md:text-sm outline-none transition-all duration-300"
          />
          <Search
            :size="14"
            class="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-300/40"
          />
        </form>
      </div>
    </div>

    <!-- OVERLAY -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
      @click="menuOpen = false"
    />

    <!-- MOBILE MENU -->
    <div
      v-if="menuOpen"
      class="fixed left-4 right-4 top-20 z-50 md:hidden"
    >
      <div
        class="bg-brown-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl"
      >
        <div class="space-y-2">
          <button
            v-for="cat in categorias"
            :key="cat.value"
            @click="irACategoria(cat.value)"
            class="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-cream-200 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <div
              class="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-for="path in cat.paths" :key="path" :d="path"/>
              </svg>
            </div>

            <div class="text-left">
              <p class="font-medium">
                {{ cat.label }}
              </p>

              <p class="text-[11px] text-cream-300/50 uppercase tracking-wider">
                Perfumes
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>