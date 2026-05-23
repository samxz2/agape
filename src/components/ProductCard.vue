<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { pinia } from '../plugins/pinia'
import { ShoppingCart, Heart } from 'lucide-vue-next'
import type { Producto } from '../data/productos'
import { FALLBACK_IMAGE } from '../data/constants'
import ProductModalMobile from './ProductModalMobile.vue'
import ProductModalDesktop from './ProductModalDesktop.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{ producto: Producto }>()
const cart = useCartStore(pinia)
const currencyStore = useCurrencyStore(pinia)
const modalOpen = ref(false)
const isLiked = ref(false)
const isMobile = ref(false)
const imagenCargada = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
  const params = new URLSearchParams(window.location.search)
  const pid = Number(params.get('producto'))
  if (pid === props.producto.id) {
    modalOpen.value = true
  }
  if (imgRef.value?.complete) {
    imagenCargada.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})

function checkScreen() {
  isMobile.value = window.innerWidth < 768
}

function addToCart(e: Event) {
  e.stopPropagation()
  cart.agregarAlCarrito(props.producto)
  
  const btn = e.currentTarget as HTMLElement
  btn.classList.add('scale-95')
  setTimeout(() => btn.classList.remove('scale-95'), 200)
}

function toggleLike(e: Event) {
  e.stopPropagation()
  isLiked.value = !isLiked.value
}

function getPrecioActual(): number {
  return props.producto.enOferta && props.producto.precioOferta 
    ? props.producto.precioOferta 
    : props.producto.precio
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = FALLBACK_IMAGE
  imagenCargada.value = true
}
</script>

<template>
  <!-- 👇 UN SOLO ELEMENTO RAÍZ que contiene todo -->
  <div class="product-card-wrapper">
    <!-- Tarjeta principal -->
    <div
      v-bind="$attrs"
      @click="modalOpen = true"
      class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-brown-100 hover:border-cream-300 flex flex-col"
    >
      <!-- Imagen -->
      <div class="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 aspect-[3/4]">
        <img
          ref="imgRef"
          :src="producto.imagen"
          :alt="producto.nombre"
          class="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          :class="imagenCargada ? 'opacity-100' : 'opacity-0'"
          loading="lazy"
          @load="imagenCargada = true"
          @error="handleImageError"
        />

        <div
          v-if="!imagenCargada"
          class="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 animate-shimmer"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-2">
          <span
            v-if="producto.enOferta"
            class="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg"
          >
            Oferta
          </span>
          <span
            v-if="producto.oldPrice"
            class="bg-cream-300 text-brown-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg"
          >
            -{{ Math.round(((producto.oldPrice - getPrecioActual()) / producto.oldPrice) * 100) }}%
          </span>
        </div>

        <!-- Like button -->
        <button
          @click="toggleLike"
          class="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
        >
          <Heart
            :size="16"
            :class="isLiked ? 'fill-red-500 text-red-500' : 'text-brown-600'"
          />
        </button>

        <!-- Estado envío -->
        <div class="absolute bottom-3 left-3">
          <span
            class="text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize backdrop-blur-sm shadow-lg"
            :class="producto.estadoEnvio === 'disponible'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'"
          >
            {{ producto.estadoEnvio === 'disponible' ? 'Disponible' : 'Agotado' }}
          </span>
        </div>
      </div>

      <!-- Info -->
      <div class="p-2.5 md:p-3 flex flex-col flex-1 gap-1.5 md:gap-2">
        <!-- Categoria -->
        <div class="flex items-center justify-between">
          <span class="text-[10px] md:text-xs text-brown-400 uppercase tracking-widest font-semibold">
            {{ producto.categoria }}
          </span>
          <span class="text-[8px] md:text-[10px] text-brown-300 font-medium">
            {{ currencyStore.currency === 'USD' ? '$ USD' : 'Bs.' }}
          </span>
        </div>

        <!-- Nombre -->
        <h3 class="font-playfair text-xs md:text-sm text-brown-800 font-semibold leading-snug line-clamp-2 flex-1">
          {{ producto.nombre }}
        </h3>

        <!-- Precio con cambio de moneda -->
        <div class="flex items-baseline gap-2">
          <span
            class="text-lg md:text-xl font-bold"
            :class="producto.enOferta ? 'text-red-600' : 'text-brown-700'"
          >
            {{ currencyStore.convertirPrecio(getPrecioActual()) }}
          </span>
          <span
            v-if="producto.oldPrice"
            class="text-xs md:text-sm text-brown-300 line-through"
          >
            {{ currencyStore.convertirPrecio(producto.oldPrice) }}
          </span>
        </div>

        <!-- Botón Añadir al carrito -->
        <button
          @click="addToCart"
          class="mt-1 md:mt-2 w-full flex items-center justify-center gap-2 bg-brown-700 hover:bg-brown-600 text-cream-50 text-xs md:text-sm font-semibold py-2.5 md:py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
        >
          <ShoppingCart :size="16" />
          <span>Añadir al carrito</span>
        </button>
      </div>
    </div>

    <!-- Modales (renderizados fuera de la tarjeta pero dentro del mismo wrapper) -->
    <ProductModalMobile
      v-if="modalOpen && isMobile"
      :producto="producto"
      @close="modalOpen = false"
      @add-to-cart="cart.agregarAlCarrito(producto)"
    />

    <ProductModalDesktop
      v-if="modalOpen && !isMobile"
      :producto="producto"
      @close="modalOpen = false"
      @add-to-cart="cart.agregarAlCarrito(producto)"
    />
  </div>
</template>

<style scoped>
/* Asegura que el wrapper no afecte el layout */
.product-card-wrapper {
  display: contents;
}
</style>