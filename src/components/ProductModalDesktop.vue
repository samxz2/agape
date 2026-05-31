<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X, ShoppingCart, Shield, Truck, Package, Minus, Plus } from 'lucide-vue-next'
import type { Producto } from '../data/productos'
import { productos } from '../data/productos'
import { FALLBACK_IMAGE } from '../data/constants'
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'

const props = defineProps<{ producto: Producto }>()
const emit = defineEmits(['close', 'add-to-cart'])
const currencyStore = useCurrencyStore(pinia)
const cantidad = ref(1)

const relacionados = computed(() =>
  productos
    .filter(p => p.categoria === props.producto.categoria && p.id !== props.producto.id)
    .slice(0, 4)
)

function abrirRelacionado(id: number) {
  emit('close')
  const url = new URL(window.location.href)
  url.searchParams.set('producto', String(id))
  window.history.pushState({}, '', url.toString())
  window.dispatchEvent(new CustomEvent('producto-change', { detail: id }))
}

function sanitizeCantidad() {
  if (cantidad.value < 1 || !Number.isFinite(cantidad.value)) {
    cantidad.value = 1
  }
}

function getPrecioActual(): number {
  return props.producto.enOferta && props.producto.precioOferta 
    ? props.producto.precioOferta 
    : props.producto.precio
}

function addWithQuantity() {
  for (let i = 0; i < cantidad.value; i++) {
    emit('add-to-cart')
  }
  emit('close')
}

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = FALLBACK_IMAGE
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-brown-900/20 backdrop-blur-sm hidden md:flex items-center justify-center p-6"
    @click="onBackdrop"
  >
    <div
      class="bg-cream-50 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex max-h-[80vh] animate-fade-in"
      @click.stop
    >
      <!-- LADO IZQUIERDO - Imagen -->
      <div class="w-[45%] relative bg-gradient-to-br from-cream-100 to-cream-50 min-h-[400px] overflow-hidden">
        <img
          :src="producto.imagen"
          :alt="producto.nombre"
          class="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
          @error="handleImageError"
        />
        
        <button @click="emit('close')" class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-md">
          <X :size="18" class="text-brown-500" />
        </button>

        <div class="absolute top-4 left-4 flex flex-col gap-2">
          <span v-if="producto.enOferta" class="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            EN OFERTA
          </span>
        </div>

        <div class="absolute bottom-4 left-4">
          <span class="text-xs px-3 py-1 rounded-full font-semibold capitalize shadow-md" :class="producto.estadoEnvio === 'disponible' ? 'bg-green-500/90 text-white' : producto.estadoEnvio === 'proximamente' ? 'bg-amber-400/90 text-brown-800' : 'bg-brown-300/80 text-brown-800'">
            {{ producto.estadoEnvio === 'disponible' ? 'Disponible' : producto.estadoEnvio === 'proximamente' ? 'Próximamente' : 'Agotado' }}
          </span>
        </div>
      </div>

      <!-- LADO DERECHO - Información -->
      <div class="w-[55%] overflow-y-auto p-6 space-y-4 scrollbar-thin">
        <div class="flex items-center justify-between">
          <span class="text-xs text-brown-400 uppercase tracking-widest font-semibold bg-cream-100 px-3 py-1 rounded-full inline-block">
            {{ producto.categoria }}
          </span>
          <span class="text-xs text-brown-400 font-medium bg-cream-100 px-2.5 py-1 rounded-full">
            {{ currencyStore.currency === 'USD' ? '$ USD' : 'Bs.' }}
          </span>
        </div>

        <h2 class="font-playfair text-xl md:text-2xl text-brown-700 font-bold leading-tight">
          {{ producto.nombre }}
        </h2>

        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold" :class="producto.enOferta ? 'text-rose-600' : 'text-brown-600'">
            {{ currencyStore.convertirPrecio(getPrecioActual()) }}
          </span>
          <span v-if="producto.oldPrice" class="text-sm text-brown-300 line-through">
            {{ currencyStore.convertirPrecio(producto.oldPrice) }}
          </span>
          <span v-if="producto.enOferta && producto.oldPrice" class="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{{ Math.round(((producto.oldPrice - getPrecioActual()) / producto.oldPrice) * 100) }}%
          </span>
        </div>

        <div class="bg-cream-100 rounded-xl p-3.5 border border-cream-200/60">
          <p class="text-brown-600 text-xs leading-relaxed whitespace-pre-line">{{ producto.descripcion }}</p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-white rounded-xl p-3 border border-cream-200/60">
            <p class="text-[10px] text-brown-400 uppercase tracking-wider">Intensidad</p>
            <p class="font-semibold text-brown-700 text-xs mt-0.5">{{ producto.intensidad }}</p>
          </div>
          <div class="bg-white rounded-xl p-3 border border-cream-200/60">
            <p class="text-[10px] text-brown-400 uppercase tracking-wider">Estado</p>
            <p class="font-semibold text-xs mt-0.5 capitalize" :class="producto.estadoEnvio === 'disponible' ? 'text-green-600' : producto.estadoEnvio === 'proximamente' ? 'text-amber-600' : 'text-brown-500'">{{ producto.estadoEnvio === 'disponible' ? 'Disponible' : producto.estadoEnvio === 'proximamente' ? 'Próximamente' : 'Agotado' }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brown-500">
          <div class="flex items-center gap-1.5">
            <Shield :size="12" class="text-green-500 shrink-0" />
            <span>Original</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Truck :size="12" class="text-brown-400 shrink-0" />
            <span>Envío Venezuela</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Package :size="12" class="text-brown-400 shrink-0" />
            <span>Seguro</span>
          </div>
        </div>

        <!-- Cantidad -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-brown-500 font-medium">Cantidad:</span>
          <div class="flex items-center gap-2 bg-white rounded-lg border border-cream-200/60 p-0.5">
            <button 
              @click="cantidad = Math.max(1, cantidad - 1)" 
              class="w-7 h-7 rounded-md bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-brown-600 font-bold transition-colors"
            >
              <Minus :size="12" />
            </button>
            <input 
              v-model.number="cantidad" 
              type="number" 
              min="1"
              @blur="sanitizeCantidad"
              class="w-12 text-center font-bold text-brown-700 text-sm bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button 
              @click="cantidad = cantidad + 1" 
              class="w-7 h-7 rounded-md bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-brown-600 font-bold transition-colors"
            >
              <Plus :size="12" />
            </button>
          </div>
        </div>

        <button @click="addWithQuantity" :disabled="producto.estadoEnvio !== 'disponible'" class="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg text-sm" :class="producto.estadoEnvio === 'disponible' ? 'bg-brown-600 hover:bg-brown-500 text-cream-50 hover:shadow-xl' : 'bg-brown-200 text-brown-400 cursor-not-allowed'">
          <ShoppingCart :size="18" />
          {{ producto.estadoEnvio === 'disponible' ? `Añadir — ${currencyStore.convertirPrecio(getPrecioActual() * cantidad)}` : 'No disponible' }}
        </button>

        <!-- Productos relacionados -->
        <div v-if="relacionados.length > 0" class="border-t border-cream-200 pt-4">
          <p class="text-[10px] text-brown-400 uppercase tracking-wider font-semibold mb-3">También te puede interesar</p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="rel in relacionados"
              :key="rel.id"
              @click="abrirRelacionado(rel.id)"
              class="group block bg-white rounded-lg overflow-hidden border border-cream-200 hover:border-gold-300/50 transition-all hover:shadow-sm text-left cursor-pointer"
            >
              <div class="aspect-square bg-cream-50 overflow-hidden">
                <img
                  :src="rel.imagen"
                  :alt="rel.nombre"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  @error="handleImageError"
                />
              </div>
              <div class="p-1.5">
                <p class="text-[9px] text-brown-700 font-semibold leading-tight line-clamp-1">{{ rel.nombre }}</p>
                <p class="text-[9px] text-brown-500 font-bold">{{ currencyStore.convertirPrecio(rel.precio) }}</p>
              </div>
            </button>
          </div>
        </div>

        <button @click="emit('close')" class="w-full text-center text-xs text-brown-400 hover:text-brown-600 transition-colors py-1">
          Seguir comprando
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.25s ease-out;
}
</style>
