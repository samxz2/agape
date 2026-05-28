<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { productos, type Producto } from '../data/productos'
import ProductCard from './ProductCard.vue'
import { Search, Grid3X3, List, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'

const categoriaActiva = ref('todos')
const busqueda = ref('')
const busquedaDebounced = ref('')
const searchOpen = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')
const soloOfertas = ref(false)
type SortMode = 'default' | 'precio-asc' | 'precio-desc'
const ordenPor = ref<SortMode>('default')

const countsPorCategoria = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of productos) {
    counts[p.categoria] = (counts[p.categoria] || 0) + 1
  }
  return counts
})

const categoriaCards = computed(() => [
  { id: 'caballero', label: 'Caballero', desc: 'Fragancias masculinas', count: countsPorCategoria.value.caballero || 0 },
  { id: 'dama', label: 'Damas', desc: 'Fragancias femeninas', count: countsPorCategoria.value.dama || 0 },
  { id: 'unisex', label: 'Unisex', desc: 'Para todos', count: countsPorCategoria.value.unisex || 0 },
  { id: 'sets', label: 'Sets', desc: 'Sets', count: countsPorCategoria.value.sets || 0 },
])

function seleccionarCategoria(cat: string) {
  categoriaActiva.value = cat
  window.scrollTo({ top: document.getElementById('productos')?.offsetTop, behavior: 'smooth' })
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('categoria')
  const buscar = params.get('buscar')
  if (cat) categoriaActiva.value = cat
  if (buscar) busqueda.value = buscar
})

let debounceTimer: ReturnType<typeof setTimeout>
watch(busqueda, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { busquedaDebounced.value = val }, 250)
})

const productosFiltrados = computed(() => {
  let resultado = productos as Producto[]

  if (categoriaActiva.value !== 'todos') {
    resultado = resultado.filter(p => p.categoria === categoriaActiva.value)
  }

  if (busquedaDebounced.value.trim()) {
    const q = busquedaDebounced.value.toLowerCase().trim()
    resultado = resultado.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q)
    )
  }

  if (soloOfertas.value) {
    resultado = resultado.filter(p => p.enOferta)
  }

  if (ordenPor.value === 'precio-asc') {
    resultado = [...resultado].sort((a, b) => {
      const pa = a.enOferta && a.precioOferta ? a.precioOferta : a.precio
      const pb = b.enOferta && b.precioOferta ? b.precioOferta : b.precio
      return pa - pb
    })
  } else if (ordenPor.value === 'precio-desc') {
    resultado = [...resultado].sort((a, b) => {
      const pa = a.enOferta && a.precioOferta ? a.precioOferta : a.precio
      const pb = b.enOferta && b.precioOferta ? b.precioOferta : b.precio
      return pb - pa
    })
  }

  return resultado
})

function toggleSort() {
  if (ordenPor.value === 'default') ordenPor.value = 'precio-asc'
  else if (ordenPor.value === 'precio-asc') ordenPor.value = 'precio-desc'
  else ordenPor.value = 'default'
}
</script>

<template>
  <div>
    <!-- Controls Bar -->
    <div class="flex flex-col sm:flex-row gap-3 items-end sm:items-center justify-between mb-6">
      <!-- Sort + Search + View Toggle -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Search toggle button -->
        <button
          @click="searchOpen = !searchOpen"
          class="p-2 rounded-lg transition-all text-sm border"
          :class="searchOpen || busqueda
            ? 'bg-brown-700 text-cream-50 border-brown-700'
            : 'bg-white text-brown-500 border-brown-200 hover:bg-brown-100'"
          :title="searchOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'"
        >
          <Search :size="18" />
        </button>

        <!-- Sort button -->
        <button
          @click="toggleSort"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border"
          :class="ordenPor !== 'default'
            ? 'bg-brown-700 text-cream-50 border-brown-700'
            : 'bg-white text-brown-500 border-brown-200 hover:bg-brown-100'"
          :title="ordenPor === 'default' ? 'Ordenar por precio' : ordenPor === 'precio-asc' ? 'Menor precio primero' : 'Mayor precio primero'"
        >
          <ArrowUpDown v-if="ordenPor === 'default'" :size="14" />
          <ArrowUp v-else-if="ordenPor === 'precio-asc'" :size="14" />
          <ArrowDown v-else :size="14" />
          <span class="hidden sm:inline">
            {{ ordenPor === 'default' ? 'Precio' : ordenPor === 'precio-asc' ? 'Menor' : 'Mayor' }}
          </span>
        </button>

        <button
          @click="viewMode = 'grid'"
          :class="viewMode === 'grid' ? 'bg-brown-700 text-cream-50' : 'bg-white text-brown-500 hover:bg-brown-100'"
          class="p-2 rounded-lg transition-all text-sm border border-brown-200"
        >
          <Grid3X3 :size="18" />
        </button>
        <button
          @click="viewMode = 'list'"
          :class="viewMode === 'list' ? 'bg-brown-700 text-cream-50' : 'bg-white text-brown-500 hover:bg-brown-100'"
          class="p-2 rounded-lg transition-all text-sm border border-brown-200"
        >
          <List :size="18" />
        </button>
      </div>
    </div>

    <!-- Search bar (togglable) -->
    <div
      v-if="searchOpen"
      class="relative w-full mb-6"
    >
      <Search :size="18" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400" />
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brown-200 bg-white text-brown-800 text-sm outline-none focus:ring-2 focus:ring-gold-300/30 focus:border-gold-300/50 placeholder-brown-300 transition-all"
      />
    </div>

    <!-- Category Cards -->
    <div v-if="categoriaActiva === 'todos' && !busquedaDebounced && !soloOfertas" class="mb-8">
      <div class="text-center mb-6">
        <h2 class="font-playfair text-2xl md:text-3xl text-brown-800 font-bold">
          Categorías
        </h2>
        <p class="text-brown-400 text-sm mt-1">
          Explora nuestra selección exclusiva
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <button
          v-for="cat in categoriaCards"
          :key="cat.id"
          @click="seleccionarCategoria(cat.id)"
          class="group relative bg-white rounded-[28px] border border-cream-200 hover:border-gold-300 p-5 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl text-center overflow-hidden cursor-pointer"
        >
          <span class="absolute top-3 right-3 bg-cream-100 text-brown-500 text-[10px] font-bold px-2 py-0.5 rounded-full group-hover:bg-gold-300 group-hover:text-brown-900 transition-colors duration-300">
            {{ cat.count }}
          </span>

          <div class="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-2xl bg-cream-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brown-700 group-hover:to-brown-600 transition-all duration-500">
            <svg v-if="cat.id === 'caballero'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brown-600 group-hover:text-cream-100 transition-colors duration-500">
              <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
              <path d="M2 22c0-5 5-8 10-8s10 3 10 8"/>
            </svg>
            <svg v-if="cat.id === 'dama'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brown-600 group-hover:text-cream-100 transition-colors duration-500">
              <circle cx="12" cy="8" r="3"/>
              <path d="M6 21v-6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v6"/>
              <path d="M8 14s-2-2-4-2"/>
              <path d="M16 14s2-2 4-2"/>
              <path d="M9 5a3 3 0 0 1 6 0"/>
            </svg>
            <svg v-if="cat.id === 'unisex'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brown-600 group-hover:text-cream-100 transition-colors duration-500">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z"/>
              <path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z"/>
              <path d="M5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z"/>
            </svg>
            <svg v-if="cat.id === 'sets'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brown-600 group-hover:text-cream-100 transition-colors duration-500">
              <rect x="3" y="8" width="18" height="12" rx="2"/>
              <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/>
              <path d="M12 6v14"/>
            </svg>
          </div>

          <h3 class="font-playfair text-lg md:text-xl text-brown-700 font-bold">
            {{ cat.label }}
          </h3>
          <p class="text-[11px] md:text-xs text-brown-400 mt-1">{{ cat.desc }}</p>
        </button>
      </div>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="font-playfair text-xl md:text-2xl font-bold text-brown-800 capitalize">
          {{ categoriaActiva === 'todos' ? 'Toda la Colección' : categoriaActiva }}
        </h2>
        <p class="text-xs text-brown-400 mt-0.5">
          {{ productosFiltrados.length }} producto{{ productosFiltrados.length !== 1 ? 's' : '' }} encontrado{{ productosFiltrados.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </div>

    <!-- Sin resultados -->
    <div
      v-if="productosFiltrados.length === 0"
      class="text-center py-20"
    >
      <div class="w-20 h-20 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search :size="30" class="text-brown-400" />
      </div>
      <p class="font-playfair text-xl text-brown-600">No encontramos resultados</p>
      <p class="text-sm text-brown-400 mt-2">Prueba con otra búsqueda o categoría</p>
      <button
        @click="busqueda = ''; categoriaActiva = 'todos'"
        class="mt-4 bg-brown-700 text-cream-50 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-brown-600 transition-colors"
      >
        Limpiar filtros
      </button>
    </div>

    <!-- Grid -->
    <div v-else>
      <TransitionGroup
        tag="div"
        :class="viewMode === 'grid'
          ? 'relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'
          : 'relative flex flex-col gap-3'"
        name="product-grid"
      >
        <ProductCard
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :producto="producto"
          :class="viewMode === 'list' ? 'flex-row' : ''"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.product-grid-move,
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.35s ease;
}
.product-grid-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.product-grid-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
.product-grid-leave-active {
  position: absolute;
}
</style>