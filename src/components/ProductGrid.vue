<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { productos, type Producto } from '../data/productos'
import ProductCard from './ProductCard.vue'
import { Search, Grid3X3, List, ArrowUpDown, ArrowUp, ArrowDown, Percent } from 'lucide-vue-next'

const categoriaActiva = ref('todos')
const busqueda = ref('')
const busquedaDebounced = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const soloOfertas = ref(false)
type SortMode = 'default' | 'precio-asc' | 'precio-desc'
const ordenPor = ref<SortMode>('default')

const categorias = [
  { label: 'Todos', value: 'todos' },
  { label: 'Caballero', value: 'caballero' },
  { label: 'Damas', value: 'dama' },
  { label: 'Unisex', value: 'unisex' },
  { label: 'Sets', value: 'sets' },
]

const ofertasCount = computed(() => productos.filter(p => p.enOferta).length)

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
    <!-- Filters Bar -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <!-- Search -->
      <div class="relative w-full sm:w-72">
        <Search :size="18" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400" />
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar por nombre..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brown-200 bg-white text-brown-800 text-sm outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 placeholder-brown-300 transition-all"
        />
      </div>

      <!-- Sort + View Toggle -->
      <div class="flex items-center gap-2">
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

    <!-- Categorías + Ofertas -->
    <div class="overflow-x-auto pb-2 mb-6 -mx-4 px-4">
      <div class="flex gap-2 min-w-max">
        <button
          v-for="cat in categorias"
          :key="cat.value"
          @click="categoriaActiva = cat.value"
          class="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border"
          :class="categoriaActiva === cat.value
            ? 'bg-brown-700 text-cream-50 border-brown-700 shadow-md'
            : 'bg-white text-brown-600 border-brown-200 hover:border-gold/50 hover:text-brown-700'"
        >
          {{ cat.label }}
        </button>

        <!-- Ofertas toggle -->
        <button
          v-if="ofertasCount > 0"
          @click="soloOfertas = !soloOfertas"
          class="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap border"
          :class="soloOfertas
            ? 'bg-red-500 text-white border-red-500 shadow-md'
            : 'bg-white text-red-500 border-red-200 hover:border-red-400'"
        >
          <Percent :size="14" />
          Ofertas
          <span class="text-[10px] opacity-80">({{ ofertasCount }})</span>
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