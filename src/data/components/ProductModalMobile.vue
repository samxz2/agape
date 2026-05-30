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
const disponible = computed(() => props.producto.estadoEnvio === 'disponible')

const relacionados = computed(() =>
  productos
    .filter(p => p.categoria === props.producto.categoria && p.id !== props.producto.id)
    .slice(0, 4)
)

function abrirRelacionado(id: number) {
  emit('close')
  window.location.href = '/?producto=' + id
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
  emit('add-to-cart', cantidad.value)
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
    class="fixed inset-0 z-50 bg-black/40 flex items-end justify-center overflow-hidden md:hidden"
    @click="onBackdrop"
  >
    <div
      class="bg-white w-full max-h-[85vh] rounded-t-2xl overflow-hidden shadow-2xl border border-brown-200 flex flex-col animate-slide-up"
      @click.stop
    >
      <!-- Swipe Indicator -->
      <div class="flex justify-center pt-3 pb-1">
        <div class="w-10 h-1 bg-brown-200 rounded-full"></div>
      </div>

      <!-- Header -->
      <div class="flex justify-between items-center px-4 pb-2">
        <span class="text-[10px] text-brown-400 uppercase tracking-widest font-medium bg-cream-100 px-2.5 py-1 rounded-full">
          {{ producto.categoria }}
        </span>
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-brown-400 bg-cream-100 px-2 py-0.5 rounded-full">
            {{ currencyStore.currency === 'USD' ? '$' : 'Bs.' }}
          </span>
          <button
            @click="emit('close')"
            class="bg-cream-100 hover:bg-cream-200 rounded-full p-1.5 transition-colors"
          >
            <X :size="16" class="text-brown-600" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        <!-- Imagen -->
        <div class="relative bg-gradient-to-b from-cream-50 to-cream-100 rounded-xl overflow-hidden h-52 -mx-4 -mt-2 px-4 pt-2">
          <img
            :src="producto.imagen"
            :alt="producto.nombre"
            class="w-full h-full object-contain p-3"
            @error="handleImageError"
          />
          <div class="absolute top-2 left-2 flex flex-col gap-1">
            <span v-if="producto.enOferta" class="bg-gold-400 text-brown-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              OFERTA
            </span>
          </div>
        </div>

        <h2 class="font-playfair text-sm text-brown-700 font-bold leading-snug">{{ producto.nombre }}</h2>

        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold" :class="producto.enOferta ? 'text-gold-500' : 'text-brown-700'">
            {{ currencyStore.convertirPrecio(getPrecioActual()) }}
          </span>
          <span v-if="producto.oldPrice" class="text-xs text-brown-300 line-through">
            {{ currencyStore.convertirPrecio(producto.oldPrice) }}
          </span>
          <span v-if="producto.enOferta && producto.oldPrice" class="bg-gold-100 text-gold-600 text-[9px] font-bold px-1 py-0.5 rounded">
            -{{ Math.round(((producto.oldPrice - getPrecioActual()) / producto.oldPrice) * 100) }}%
          </span>
        </div>

        <div class="bg-cream-100 rounded-xl p-2.5 border border-cream-200">
          <p class="text-brown-600 text-[11px] leading-relaxed whitespace-pre-line">{{ producto.descripcion }}</p>
        </div>

        <div class="grid grid-cols-2 gap-1.5">
          <div class="bg-white rounded-lg p-2 border border-brown-100">
            <p class="text-[9px] text-brown-400 uppercase tracking-wider">Intensidad</p>
            <p class="font-semibold text-brown-700 text-[11px] mt-0.5">{{ producto.intensidad }}</p>
          </div>
          <div class="bg-white rounded-lg p-2 border border-brown-100">
            <p class="text-[9px] text-brown-400 uppercase tracking-wider">Estado</p>
            <p class="font-semibold text-[11px] mt-0.5 capitalize" :class="producto.estadoEnvio === 'disponible' ? 'text-green-600' : 'text-red-600'">{{ producto.estadoEnvio }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-brown-500">
          <div class="flex items-center gap-1">
            <Shield :size="11" class="text-green-500 shrink-0" />
            <span>Original</span>
          </div>
          <div class="flex items-center gap-1">
            <Truck :size="11" class="text-brown-400 shrink-0" />
            <span>Envío</span>
          </div>
          <div class="flex items-center gap-1">
            <Package :size="11" class="text-brown-400 shrink-0" />
            <span>Seguro</span>
          </div>
        </div>

        <!-- Cantidad -->
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-brown-600 font-medium">Cantidad:</span>
          <div class="flex items-center gap-1.5 bg-white rounded-lg border border-brown-200 p-0.5">
            <button
              @click="cantidad = Math.max(1, cantidad - 1)"
              class="w-6 h-6 rounded bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-brown-600 font-bold transition-colors"
            >
              <Minus :size="10" />
            </button>
            <input
              v-model.number="cantidad"
              type="number"
              min="1"
              @blur="sanitizeCantidad"
              class="w-10 text-center font-bold text-brown-700 text-xs bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              @click="cantidad = cantidad + 1"
              class="w-6 h-6 rounded bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-brown-600 font-bold transition-colors"
            >
              <Plus :size="10" />
            </button>
          </div>
        </div>

        <button @click="addWithQuantity" :disabled="!disponible" class="w-full flex items-center justify-center gap-2 font-bold py-2.5 rounded-xl transition-all duration-200 shadow-lg text-xs" :class="disponible ? 'bg-brown-600 hover:bg-brown-500 text-cream-50 active:scale-[0.98]' : 'bg-brown-200 text-brown-400 cursor-not-allowed'">
          <ShoppingCart v-if="disponible" :size="15" />
          {{ disponible ? 'Añadir — ' + currencyStore.convertirPrecio(getPrecioActual() * cantidad) : 'Agotado' }}
        </button>

        <!-- Productos relacionados -->
        <div v-if="relacionados.length > 0" class="border-t border-cream-200 pt-3">
          <p class="text-[10px] text-brown-400 uppercase tracking-wider font-semibold mb-2">También te puede interesar</p>
          <div class="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
            <button
              v-for="rel in relacionados"
              :key="rel.id"
              @click="abrirRelacionado(rel.id)"
              class="group shrink-0 w-24 bg-white rounded-xl overflow-hidden border border-brown-100 hover:border-gold-400/40 transition-all text-left cursor-pointer"
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
                <p class="text-[9px] text-gold-500 font-bold">{{ currencyStore.convertirPrecio(rel.precio) }}</p>
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
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>