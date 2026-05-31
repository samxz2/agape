<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-vue-next'
import type { Producto } from '../data/productos'
import { FALLBACK_IMAGE } from '../data/constants'
import ProductModalMobile from './ProductModalMobile.vue'
import ProductModalDesktop from './ProductModalDesktop.vue'

const props = defineProps<{ producto: Producto }>()
const cart = useCartStore(pinia)
const currencyStore = useCurrencyStore(pinia)
const modalOpen = ref(false)
const isLiked = ref(false)
const isMobile = ref(false)
const imagenCargada = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)
const cantidad = ref(1)
const animatingAdd = ref(false)

const disponible = computed(() => props.producto.estadoEnvio === 'disponible')

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
  if (!disponible.value) return
  for (let i = 0; i < cantidad.value; i++) {
    cart.agregarAlCarrito(props.producto)
  }
  animatingAdd.value = true
  setTimeout(() => { animatingAdd.value = false }, 600)
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

function cerrarModal() {
  modalOpen.value = false
  const url = new URL(window.location.href)
  if (url.searchParams.has('producto')) {
    url.searchParams.delete('producto')
    window.history.replaceState({}, '', url.toString())
  }
}

function badgeColor() {
  if (props.producto.estadoEnvio === 'disponible') return 'bg-green-500/90 text-white'
  if (props.producto.estadoEnvio === 'proximamente') return 'bg-amber-400/90 text-brown-800'
  return 'bg-brown-300/80 text-brown-800'
}

function badgeText() {
  if (props.producto.estadoEnvio === 'disponible') return 'Disponible'
  if (props.producto.estadoEnvio === 'proximamente') return 'Próximamente'
  return 'Agotado'
}
</script>

<template>
  <div
    @click="modalOpen = true"
    class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer border border-cream-200/60 hover:border-gold-300/50 flex flex-col"
  >
    <!-- Imagen -->
    <div class="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 aspect-[4/5]">
      <img
        ref="imgRef"
        :src="producto.imagen"
        :alt="producto.nombre"
        class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out-expo"
        :class="imagenCargada ? 'opacity-100' : 'opacity-0'"
        loading="lazy"
        @load="imagenCargada = true"
        @error="handleImageError"
      />

      <div
        v-if="!imagenCargada"
        class="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 animate-shimmer"
      />

      <div class="img-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span
          v-if="producto.enOferta"
          class="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg"
        >
          Oferta
        </span>
        <span
          v-if="producto.oldPrice"
          class="bg-brown-600/80 text-cream-50 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-sm"
        >
          -{{ Math.round(((producto.oldPrice - getPrecioActual()) / producto.oldPrice) * 100) }}%
        </span>
      </div>

      <!-- Like button -->
      <button
        @click="toggleLike"
        class="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300"
      >
        <Heart
          :size="13"
          :class="isLiked ? 'fill-rose-500 text-rose-500' : 'text-brown-500'"
        />
      </button>

      <!-- Estado envío -->
      <div class="absolute bottom-2 left-2">
        <span
          class="text-[9px] px-2 py-0.5 rounded-full font-semibold capitalize shadow-lg"
          :class="badgeColor()"
        >
          {{ badgeText() }}
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-2.5 flex flex-col flex-1 gap-1">
      <!-- Categoria -->
      <div class="flex items-center justify-between">
        <span class="text-[9px] text-brown-400 uppercase tracking-widest font-semibold">
          {{ producto.categoria }}
        </span>
        <span class="text-[7px] text-brown-300 font-medium">
          {{ currencyStore.currency === 'USD' ? '$ USD' : 'Bs.' }}
        </span>
      </div>

      <!-- Nombre -->
      <h3 class="font-playfair text-[11px] text-brown-700 font-semibold leading-snug line-clamp-2 flex-1">
        {{ producto.nombre }}
      </h3>

      <!-- Precio -->
      <div class="flex items-baseline gap-2">
        <span
          class="text-sm font-bold"
          :class="producto.enOferta ? 'text-rose-600' : 'text-brown-600'"
        >
          {{ currencyStore.convertirPrecio(getPrecioActual()) }}
        </span>
        <span
          v-if="producto.oldPrice"
          class="text-[10px] text-brown-300 line-through"
        >
          {{ currencyStore.convertirPrecio(producto.oldPrice) }}
        </span>
      </div>

      <!-- Cantidad selector -->
      <div v-if="disponible" class="flex items-center justify-between bg-cream-100 rounded-lg p-0.5">
        <button
          @click.stop="cantidad = Math.max(1, cantidad - 1)"
          class="w-5 h-5 rounded-md bg-white hover:bg-cream-200 flex items-center justify-center transition-colors shadow-sm"
        >
          <Minus :size="9" class="text-brown-500" />
        </button>
        <span class="text-[10px] font-bold text-brown-700 w-4 text-center">{{ cantidad }}</span>
        <button
          @click.stop="cantidad = cantidad + 1"
          class="w-5 h-5 rounded-md bg-white hover:bg-cream-200 flex items-center justify-center transition-colors shadow-sm"
        >
          <Plus :size="9" class="text-brown-500" />
        </button>
      </div>

      <!-- Botón Añadir al carrito -->
      <button
        @click="addToCart"
        :disabled="!disponible"
        class="w-full flex items-center justify-center gap-1.5 text-[10px] font-semibold py-1.5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
        :class="disponible
          ? 'bg-brown-600 hover:bg-brown-500 text-cream-50'
          : 'bg-brown-200 text-brown-400 cursor-not-allowed'"
      >
        <ShoppingCart :size="12" :class="animatingAdd ? 'animate-bounce-once' : ''" />
        <span>{{ disponible ? 'Añadir' : 'No disponible' }}</span>
      </button>
    </div>
  </div>

  <!-- Modal MÓVIL -->
  <Transition name="modal">
    <ProductModalMobile
      v-if="modalOpen && isMobile"
      :producto="producto"
      @close="cerrarModal"
      @add-to-cart="disponible ? cart.agregarAlCarrito(producto) : null"
    />
  </Transition>

  <!-- Modal DESKTOP -->
  <Transition name="modal">
    <ProductModalDesktop
      v-if="modalOpen && !isMobile"
      :producto="producto"
      @close="cerrarModal"
      @add-to-cart="disponible ? cart.agregarAlCarrito(producto) : null"
    />
  </Transition>
</template>

<style scoped>
.modal-enter-active {
  transition: all 0.3s ease-out;
}
.modal-leave-active {
  transition: all 0.2s ease-in;
}
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}

@keyframes bounce-once {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
  60% { transform: translateY(-2px); }
}
.animate-bounce-once {
  animation: bounce-once 0.4s ease;
}
</style>
