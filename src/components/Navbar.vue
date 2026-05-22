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
  {
    label: 'Caballero',
    value: 'caballero',
    svg: ''
  },
  {
    label: 'Damas',
    value: 'dama',
    svg: ''
  },
  {
    label: 'Unisex',
    value: 'unisex',
    svg: ''
  },
  {
    label: 'Sets',
    value: 'sets',
    svg: ''
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
    <!-- TOP -->
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-3">

        <!-- LOGO -->
        <a href="/" class="flex items-center gap-3 shrink-0">
          <img
            src="https://i.ibb.co/CpHdX08t/1001879919.png"
            alt="Agape Collection"
            class="h-10 md:h-12 w-auto drop-shadow-lg"
          />

          <div class="leading-tight">
            <h1 class="font-playfair text-sm md:text-lg text-cream-50 font-bold tracking-wide">
              Agape Collection
            </h1>

            <p class="text-[9px] md:text-[11px] uppercase tracking-[0.35em] text-cream-300/70">
              Parfum
            </p>
          </div>
        </a>

        <!-- SEARCH DESKTOP -->
        <div class="hidden md:flex flex-1 max-w-lg mx-5">
          <form @submit.prevent="buscar" class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar perfume..."
              class="w-full bg-white/5 border border-white/10 focus:border-gold-300/50 text-cream-100 placeholder:text-cream-300/40 rounded-full px-5 py-3 pr-12 text-sm outline-none backdrop-blur-xl transition-all duration-300"
            />

            <button
              type="submit"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-cream-300/50 hover:text-cream-100 transition-colors"
            >
              <Search :size="18" />
            </button>
          </form>
        </div>

        <!-- ACTIONS -->
        <div class="flex items-center gap-2">
          <CurrencyToggle />

          <!-- SEARCH MOBILE -->
          <button
            @click="searchOpen = !searchOpen"
            class="md:hidden text-cream-200 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
          >
            <Search :size="20" />
          </button>

          <!-- CART -->
          <button
            @click="cart.toggleCart()"
            class="relative text-cream-200 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
          >
            <ShoppingBag :size="21" />

            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-1 -right-1 bg-gold-300 text-brown-900 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg"
            >
              {{ cart.totalItems }}
            </span>
          </button>

          <!-- MENU -->
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden text-cream-200 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/10"
          >
            <Menu v-if="!menuOpen" :size="22" />
            <X v-else :size="22" />
          </button>
        </div>
      </div>

      <!-- CATEGORIAS DESKTOP -->
      <div class="hidden md:flex justify-center mt-5">
        <div
          class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 backdrop-blur-xl"
        >
          <button
            v-for="cat in categorias"
            :key="cat.value"
            @click="irACategoria(cat.value)"
            class="group flex items-center gap-2 px-5 py-2 rounded-full text-sm text-cream-200 hover:text-white hover:bg-gradient-to-r hover:from-brown-700 hover:to-brown-600 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="group-hover:scale-110 transition-transform duration-300"
            >
              <path :d="cat.svg"/>
            </svg>

            <span class="font-medium tracking-wide">
              {{ cat.label }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- SEARCH MOBILE -->
    <div
      v-if="searchOpen"
      class="md:hidden border-t border-white/5 bg-brown-900/95 backdrop-blur-xl px-4 py-4"
    >
      <form @submit.prevent="buscar" class="flex gap-2">
        <div class="relative flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar perfume..."
            class="w-full bg-white/5 border border-white/10 text-cream-100 placeholder:text-cream-300/40 rounded-2xl pl-4 pr-10 py-3 text-sm outline-none"
          />

          <Search
            :size="18"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-cream-300/40"
          />
        </div>

        <button
          type="submit"
          class="bg-gradient-to-r from-brown-700 to-brown-600 hover:from-brown-600 hover:to-brown-500 text-cream-50 px-5 rounded-2xl text-sm font-semibold transition-all duration-300"
        >
          Buscar
        </button>
      </form>
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
                <path :d="cat.svg"/>
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