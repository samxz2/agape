<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'
import { ShoppingCart, Minus, Plus } from 'lucide-vue-next'
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
    class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
  >
    <!-- Imagen -->
    <div class="relative overflow-hidden bg-gradient-to-br from-cream-200 to-cream-100 aspect-[3/4]">
      <img
        ref="imgRef"
        :src="producto.imagen"
        :alt="producto.nombre"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out-expo"
        :class="imagenCargada ? 'opacity-100' : 'opacity-0'"
        loading="lazy"
        @load="imagenCargada = true"
        @error="handleImageError"
      />

      <div
        v-if="!imagenCargada"
        class="absolute inset-0 bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300 animate-shimmer"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <!-- Badge Oferta -->
      <div class="absolute top-2 left-2">
        <span
          v-if="producto.enOferta"
          class="bg-gold-400 text-brown-800 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg"
        >
          Oferta
        </span>
      </div>

      <!-- Badge descuento -->
      <div class="absolute top-2 right-2">
        <span
          v-if="producto.oldPrice"
          class="bg-brown-800/70 text-cream-50 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg"
        >
          -{{ Math.round(((producto.oldPrice - getPrecioActual()) / producto.oldPrice) * 100) }}%
        </span>
      </div>

      <!-- Estado envío -->
      <div class="absolute bottom-2 left-2">
        <span
          class="text-[10px] px-2.5 py-1 rounded-lg font-semibold capitalize shadow-md"
          :class="badgeColor()"
        >
          {{ badgeText() }}
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3 flex flex-col flex-1 gap-1.5 bg-gradient-to-b from-white to-cream-50">
      <!-- Categoria y moneda -->
      <div class="flex items-center justify-between">
        <span class="text-[10px] text-brown-400 uppercase tracking-widest font-semibold">
          {{ producto.categoria }}
        </span>
        <span class="text-[8px] text-brown-300 font-medium bg-cream-100 px-1.5 py-0.5 rounded-md">
          {{ currencyStore.currency === 'USD' ? '$ USD' : 'Bs.' }}
        </span>
      </div>

      <!-- Nombre -->
      <h3 class="font-playfair text-sm text-brown-800 font-semibold leading-snug line-clamp-2 flex-1">
        {{ producto.nombre }}
      </h3>

      <!-- Precio -->
      <div class="flex items-baseline gap-2 mt-auto">
        <span
          class="text-base font-black"
          :class="producto.enOferta ? 'text-rose-500' : 'text-brown-700'"
        >
          {{ currencyStore.convertirPrecio(getPrecioActual()) }}
        </span>
        <span
          v-if="producto.oldPrice"
          class="text-[11px] text-brown-300 line-through"
        >
          {{ currencyStore.convertirPrecio(producto.oldPrice) }}
        </span>
      </div>

      <div class="h-px bg-gradient-to-r from-transparent via-cream-200 to-transparent" />

      <!-- Cantidad + botón en fila -->
      <div v-if="disponible" class="flex items-center gap-2">
        <div class="flex items-center bg-cream-100 rounded-lg">
          <button
            @click.stop="cantidad = Math.max(1, cantidad - 1)"
            class="w-7 h-7 flex items-center justify-center hover:bg-cream-200 rounded-l-lg transition-colors"
          >
            <Minus :size="10" class="text-brown-600" />
          </button>
          <span class="text-xs font-bold text-brown-700 w-5 text-center">{{ cantidad }}</span>
          <button
            @click.stop="cantidad = cantidad + 1"
            class="w-7 h-7 flex items-center justify-center hover:bg-cream-200 rounded-r-lg transition-colors"
          >
            <Plus :size="10" class="text-brown-600" />
          </button>
        </div>
        <button
          @click.stop="addToCart"
          class="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
          :class="disponible
            ? 'bg-brown-700 hover:bg-brown-600 text-cream-50'
            : 'bg-brown-200 text-brown-400 cursor-not-allowed'"
        >
          <ShoppingCart :size="13" :class="animatingAdd ? 'animate-bounce-once' : ''" />
          Añadir
        </button>
      </div>
      <button
        v-else
        disabled
        class="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl bg-brown-200 text-brown-400 cursor-not-allowed"
      >
        <ShoppingCart :size="13" />
        No disponible
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
