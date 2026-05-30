<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'
import { ShoppingCart } from 'lucide-vue-next'
import type { Producto } from '../data/productos'
import { FALLBACK_IMAGE } from '../data/constants'
import ProductModalMobile from './ProductModalMobile.vue'
import ProductModalDesktop from './ProductModalDesktop.vue'

const props = defineProps<{ producto: Producto }>()
const cart = useCartStore(pinia)
const currencyStore = useCurrencyStore(pinia)
const modalOpen = ref(false)
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

const disponible = computed(() => props.producto.estadoEnvio === 'disponible')

function getPrecioActual(): number {
  return props.producto.enOferta && props.producto.precioOferta
    ? props.producto.precioOferta
    : props.producto.precio
}

function addToCart(e: Event) {
  if (!disponible.value) return
  e.stopPropagation()
  cart.agregarAlCarrito(props.producto)
  const btn = e.currentTarget as HTMLElement
  btn.classList.add('scale-95')
  setTimeout(() => btn.classList.remove('scale-95'), 200)
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = FALLBACK_IMAGE
  imagenCargada.value = true
}
</script>

<template>
  <div
    @click="modalOpen = true"
    class="group bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border border-brown-100 hover:border-gold-400/40 card-hover flex flex-col"
  >
    <!-- Imagen -->
    <div class="relative overflow-hidden bg-gradient-to-b from-cream-50 to-cream-100 aspect-[3/4]">
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
        class="absolute inset-0 bg-cream-100 animate-shimmer"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span
          v-if="producto.enOferta"
          class="bg-gold-400 text-brown-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg"
        >
          Oferta
        </span>
        <span
          v-if="producto.oldPrice"
          class="bg-white/80 backdrop-blur-sm text-brown-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-brown-200"
        >
          -{{ Math.round(((producto.oldPrice - getPrecioActual()) / producto.oldPrice) * 100) }}%
        </span>
      </div>

      <!-- Estado envío -->
      <div class="absolute bottom-3 left-3">
        <span
          class="text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize backdrop-blur-sm shadow-lg"
          :class="producto.estadoEnvio === 'disponible'
            ? 'bg-green-600/90 text-white'
            : 'bg-red-600/90 text-white'"
        >
          {{ producto.estadoEnvio === 'disponible' ? 'Disponible' : 'Agotado' }}
        </span>
      </div>

      <!-- Quick add -->
      <button
        v-if="disponible"
        @click.stop="addToCart"
        class="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-brown-600 text-cream-50 flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brown-500 active:scale-95"
      >
        <ShoppingCart :size="16" />
      </button>
    </div>

    <!-- Info -->
    <div class="p-3 flex flex-col flex-1 gap-1.5">
      <div class="flex items-center justify-between">
        <span class="text-[10px] md:text-xs text-brown-400 uppercase tracking-widest font-medium">
          {{ producto.categoria }}
        </span>
        <span class="text-[8px] md:text-[10px] text-brown-300">
          {{ currencyStore.currency === 'USD' ? '$ USD' : 'Bs.' }}
        </span>
      </div>

      <h3 class="font-playfair text-xs md:text-sm text-brown-700 font-semibold leading-snug line-clamp-2 flex-1">
        {{ producto.nombre }}
      </h3>

      <div class="flex items-baseline gap-2">
        <span
          class="text-lg md:text-xl font-bold text-brown-700"
          :class="producto.enOferta ? 'text-gold-500' : ''"
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

      <button
        @click.stop="addToCart"
        :disabled="!disponible"
        class="mt-1 w-full flex items-center justify-center gap-2 text-xs md:text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md"
        :class="disponible
          ? 'bg-brown-600 hover:bg-brown-500 text-cream-50 active:scale-95'
          : 'bg-brown-200 text-brown-400 cursor-not-allowed'"
      >
        <ShoppingCart v-if="disponible" :size="15" />
        <span>{{ disponible ? 'Añadir al carrito' : 'Agotado' }}</span>
      </button>
    </div>
  </div>

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
</template>