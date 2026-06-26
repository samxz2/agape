<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useCartStore, type CartItem } from '../stores/cartStore'
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'
import { FALLBACK_IMAGE } from '../data/constants'
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Shield, Truck } from 'lucide-vue-next'

const cart = useCartStore(pinia)
const currencyStore = useCurrencyStore(pinia)

function getPrecioItem(item: CartItem): number {
  return item.enOferta && item.precioOferta ? item.precioOferta : item.precio
}

function handleCartImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = FALLBACK_IMAGE
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && cart.isOpen) cart.toggleCart()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))

watch(() => cart.isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <!-- Backdrop -->
  <Transition name="backdrop">
    <div
      v-if="cart.isOpen"
      class="fixed inset-0 z-40 bg-brown-900/20 backdrop-blur-sm"
      @click="cart.toggleCart()"
    />
  </Transition>

  <!-- Drawer -->
  <div
    class="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-cream-50 shadow-2xl flex flex-col transition-all duration-[400ms] ease-out-expo"
    :class="cart.isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Header -->
    <div class="bg-cream-100 border-b border-cream-200 px-5 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <ShoppingBag :size="24" class="text-brown-500" />
            <span
              v-if="cart.totalItems > 0"
              class="absolute -top-2 -right-2 bg-gold-400 text-brown-800 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md"
            >
              {{ cart.totalItems }}
            </span>
          </div>
          <div>
            <h2 class="font-playfair text-lg text-brown-700 font-bold">Tu Carrito</h2>
            <p class="text-brown-400/60 text-xs">
              {{ currencyStore.currency === 'USD' ? 'Precios en USD' : 'Precios en Bs.' }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-brown-500 font-medium bg-cream-200/70 px-2 py-0.5 rounded-full">
            {{ currencyStore.currency === 'USD' ? '$' : 'Bs.' }}
          </span>
          <button
            @click="cart.toggleCart()"
            class="text-brown-400 hover:text-brown-600 p-2 rounded-full hover:bg-cream-200/50 transition-all"
          >
            <X :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Items -->
    <div class="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
      <!-- Vacío -->
      <div
        v-if="cart.items.length === 0"
        class="flex flex-col items-center justify-center h-full gap-4 text-brown-400"
      >
        <div class="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center">
          <ShoppingBag :size="40" class="text-brown-300" />
        </div>
        <div class="text-center">
          <p class="font-playfair text-xl text-brown-500">Tu carrito está vacío</p>
          <p class="text-sm text-brown-400 mt-1">Agrega algunos perfumes para continuar</p>
        </div>
        <button
          @click="cart.toggleCart()"
          class="bg-gold-400 hover:bg-gold-300 text-brown-800 px-8 py-3 rounded-full text-sm font-bold transition-all shadow-lg"
        >
          Ver productos
        </button>
      </div>

      <!-- Lista de items -->
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="bg-white rounded-3xl p-3 shadow-sm border border-cream-200/60 flex gap-3 items-center"
      >
        <img
          :src="item.imagen"
          :alt="item.nombre"
          class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl shrink-0"
          @error="handleCartImageError"
        />
        <div class="flex flex-col flex-1 gap-1 min-w-0">
          <p class="text-[10px] md:text-xs text-brown-400 uppercase tracking-wider">{{ item.categoria }}</p>
          <p class="text-xs md:text-sm font-semibold text-brown-700 leading-snug line-clamp-2">
            {{ item.nombre }}
          </p>
          <p class="text-brown-600 font-bold text-sm md:text-base">
            {{ currencyStore.convertirPrecio(getPrecioItem(item)) }}
          </p>

          <!-- Controles cantidad -->
          <div class="flex items-center gap-2 mt-1">
            <div class="flex items-center gap-1 bg-cream-100 rounded-full p-0.5">
              <button
                @click="cart.cambiarCantidad(item.id, item.cantidad - 1)"
                class="w-6 h-6 rounded-full bg-white hover:bg-cream-200 flex items-center justify-center transition-colors shadow-sm"
              >
                <Minus :size="10" class="text-brown-500" />
              </button>
              <span class="text-xs font-bold text-brown-700 w-5 text-center">
                {{ item.cantidad }}
              </span>
              <button
                @click="cart.cambiarCantidad(item.id, item.cantidad + 1)"
                class="w-6 h-6 rounded-full bg-white hover:bg-cream-200 flex items-center justify-center transition-colors shadow-sm"
              >
                <Plus :size="10" class="text-brown-500" />
              </button>
            </div>

            <button
              @click="cart.eliminarDelCarrito(item.id)"
              class="ml-auto text-rose-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-all"
            >
              <Trash2 :size="14" />
            </button>
          </div>
          <p class="text-[10px] text-brown-400 mt-0.5">
            Subtotal: {{ currencyStore.convertirPrecio(getPrecioItem(item) * item.cantidad) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="cart.items.length > 0"
      class="border-t border-cream-200 px-5 py-4 bg-cream-50 space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
    >
      <div class="flex items-center gap-4 text-xs text-brown-500 justify-center">
        <span class="flex items-center gap-1">
          <Shield :size="12" class="text-green-500" />
          Originales
        </span>
        <span class="flex items-center gap-1">
          <Truck :size="12" class="text-brown-400" />
          Envío
        </span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-brown-500 text-sm">Total</span>
        <span class="text-lg font-bold font-playfair text-brown-700">
          {{ currencyStore.convertirPrecio(cart.totalPriceUSD) }}
        </span>
      </div>

      <button
        @click="cart.generarMensajeWhatsapp()"
        class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3.5 rounded-full transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl text-sm"
      >
        <MessageCircle :size="20" />
        Pedir por WhatsApp
      </button>

      <button
        @click="cart.solicitarVaciar()"
        class="w-full text-center text-xs text-brown-400 hover:text-rose-500 transition-colors py-1"
      >
        Vaciar carrito
      </button>
    </div>

    <!-- Confirmación vaciar carrito -->
    <Transition name="confirm">
      <div
        v-if="cart.showVaciarConfirm"
        class="absolute inset-0 z-10 bg-brown-900/20 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <div class="bg-cream-50 rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center space-y-4" @click.stop>
          <div class="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </div>
          <div>
            <h3 class="font-playfair text-lg text-brown-700 font-bold">Vaciar carrito</h3>
            <p class="text-sm text-brown-400 mt-1">¿Estás seguro? Esta acción no se puede deshacer.</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="cart.cancelarVaciar()"
              class="flex-1 py-2.5 rounded-full border border-cream-200 text-brown-600 text-sm font-semibold hover:bg-cream-100 transition-all"
            >
              Cancelar
            </button>
            <button
              @click="cart.confirmarVaciar()"
              class="flex-1 py-2.5 rounded-full bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-all"
            >
              Vaciar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.confirm-enter-active {
  transition: all 0.25s ease-out;
}
.confirm-leave-active {
  transition: all 0.2s ease-in;
}
.confirm-enter-from,
.confirm-leave-to {
  opacity: 0;
}
.confirm-enter-from > div,
.confirm-leave-to > div {
  transform: scale(0.95);
}
</style>
