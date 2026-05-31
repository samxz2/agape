<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { productos, type Producto } from '../data/productos'
import ProductCard from './ProductCard.vue'
import { Search, Grid3X3, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const ITEMS_PER_PAGE = 12

const categoriaActiva = ref('todos')
const busqueda = ref('')
const busquedaDebounced = ref('')
const searchOpen = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')
const soloOfertas = ref(false)
type SortMode = 'default' | 'precio-asc' | 'precio-desc'
const ordenPor = ref<SortMode>('default')
const precioMin = ref<number | null>(null)
const precioMax = ref<number | null>(null)
const paginaActual = ref(1)

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
  { id: 'sets', label: 'Sets', desc: 'Sets y combos', count: countsPorCategoria.value.sets || 0 },
])

function seleccionarCategoria(cat: string) {
  categoriaActiva.value = cat
  paginaActual.value = 1
  window.scrollTo({ top: document.getElementById('productos')?.offsetTop, behavior: 'smooth' })
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('categoria')
  const buscar = params.get('buscar')
  if (cat) categoriaActiva.value = cat
  if (buscar) busqueda.value = buscar

  window.addEventListener('categoria-change', handleCategoriaChange)
  window.addEventListener('buscar-change', handleBuscarChange)
})

onUnmounted(() => {
  window.removeEventListener('categoria-change', handleCategoriaChange)
  window.removeEventListener('buscar-change', handleBuscarChange)
})

function handleCategoriaChange(e: Event) {
  categoriaActiva.value = (e as CustomEvent).detail
  paginaActual.value = 1
  window.scrollTo({ top: document.getElementById('productos')?.offsetTop, behavior: 'smooth' })
}

function handleBuscarChange(e: Event) {
  busqueda.value = (e as CustomEvent).detail
  paginaActual.value = 1
}

let debounceTimer: ReturnType<typeof setTimeout>
watch(busqueda, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { busquedaDebounced.value = val; paginaActual.value = 1 }, 250)
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

  if (precioMin.value !== null) {
    resultado = resultado.filter(p => {
      const pr = p.enOferta && p.precioOferta ? p.precioOferta : p.precio
      return pr >= precioMin.value!
    })
  }
  if (precioMax.value !== null) {
    resultado = resultado.filter(p => {
      const pr = p.enOferta && p.precioOferta ? p.precioOferta : p.precio
      return pr <= precioMax.value!
    })
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

const totalPaginas = computed(() => Math.max(1, Math.ceil(productosFiltrados.value.length / ITEMS_PER_PAGE)))

const productosPaginados = computed(() => {
  const start = (paginaActual.value - 1) * ITEMS_PER_PAGE
  return productosFiltrados.value.slice(start, start + ITEMS_PER_PAGE)
})

function irPagina(pag: number) {
  if (pag < 1 || pag > totalPaginas.value) return
  paginaActual.value = pag
  window.scrollTo({ top: document.getElementById('productos')?.offsetTop, behavior: 'smooth' })
}

const rangoPaginas = computed(() => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  const rango: number[] = []
  let start = Math.max(1, actual - 2)
  let end = Math.min(total, actual + 2)
  if (end - start < 4) {
    if (start === 1) end = Math.min(total, start + 4)
    else start = Math.max(1, end - 4)
  }
  for (let i = start; i <= end; i++) rango.push(i)
  return rango
})

function toggleSort() {
  if (ordenPor.value === 'default') ordenPor.value = 'precio-asc'
  else if (ordenPor.value === 'precio-asc') ordenPor.value = 'precio-desc'
  else ordenPor.value = 'default'
}

function limpiarFiltros() {
  busqueda.value = ''
  categoriaActiva.value = 'todos'
  precioMin.value = null
  precioMax.value = null
  soloOfertas.value = false
  ordenPor.value = 'default'
  paginaActual.value = 1
}
</script>

<template>
  <div>
    <!-- Controls Bar -->
    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
      <div class="flex items-center gap-2 shrink-0 flex-wrap">
        <button
          @click="searchOpen = !searchOpen"
          class="p-2 rounded-lg transition-all text-sm border"
          :class="searchOpen || busqueda
            ? 'bg-brown-600 text-cream-50 border-brown-600'
            : 'bg-white text-brown-500 border-cream-200 hover:bg-cream-100'"
        >
          <Search :size="18" />
        </button>

        <button
          @click="toggleSort"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border"
          :class="ordenPor !== 'default'
            ? 'bg-brown-600 text-cream-50 border-brown-600'
            : 'bg-white text-brown-500 border-cream-200 hover:bg-cream-100'"
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
          :class="viewMode === 'grid' ? 'bg-brown-600 text-cream-50 border-brown-600' : 'bg-white text-brown-500 border-cream-200 hover:bg-cream-100'"
          class="p-2 rounded-lg transition-all text-sm border"
          title="Vista cuadrícula"
        >
          <Grid3X3 :size="18" />
        </button>
      </div>

      <!-- Price filter -->
      <div class="flex items-center gap-2">
        <input
          v-model.number="precioMin"
          type="number"
          placeholder="Min $"
          class="w-20 px-2 py-2 rounded-lg border border-cream-200 bg-white text-brown-700 text-xs outline-none focus:ring-2 focus:ring-gold-300/30"
          @input="paginaActual = 1"
        />
        <span class="text-brown-300 text-xs">—</span>
        <input
          v-model.number="precioMax"
          type="number"
          placeholder="Max $"
          class="w-20 px-2 py-2 rounded-lg border border-cream-200 bg-white text-brown-700 text-xs outline-none focus:ring-2 focus:ring-gold-300/30"
          @input="paginaActual = 1"
        />
        <button
          v-if="precioMin || precioMax || busqueda || categoriaActiva !== 'todos' || soloOfertas"
          @click="limpiarFiltros"
          class="text-[10px] text-brown-400 hover:text-brown-600 px-2 py-1"
        >
          Limpiar
        </button>
      </div>
    </div>

    <!-- Search bar -->
    <div v-if="searchOpen" class="relative w-full mb-6 animate-slide-up">
      <Search :size="18" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400" />
      <input
        v-model="busqueda"
        type="text"
        placeholder="Buscar por nombre..."
        class="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-200 bg-white text-brown-700 text-sm outline-none focus:ring-2 focus:ring-gold-300/30 focus:border-gold-300/50 placeholder-brown-300/60 transition-all"
      />
    </div>

    <!-- Category Cards -->
    <div v-if="categoriaActiva === 'todos' && !busquedaDebounced && !soloOfertas && !precioMin && !precioMax" class="mb-12">
      <div class="text-center mb-8">
        <h2 class="font-playfair text-2xl md:text-3xl text-brown-700 font-bold">Categorías</h2>
        <p class="text-brown-400 text-sm mt-1">Explora nuestra selección exclusiva</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <button
          v-for="cat in categoriaCards"
          :key="cat.id"
          @click="seleccionarCategoria(cat.id)"
          class="group relative bg-white rounded-2xl border border-cream-200 hover:border-gold-300/60 p-5 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl text-center overflow-hidden cursor-pointer"
        >
          <span class="absolute top-3 right-3 bg-cream-100 text-brown-500 text-[10px] font-bold px-2 py-0.5 rounded-full group-hover:bg-brown-600 group-hover:text-cream-50 transition-colors duration-300">
            {{ cat.count }}
          </span>

          <h3 class="font-playfair text-lg md:text-xl text-brown-700 font-bold group-hover:text-brown-600 transition-colors">
            {{ cat.label }}
          </h3>
          <p class="text-[11px] md:text-xs text-brown-400 mt-1">{{ cat.desc }}</p>
        </button>
      </div>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="font-playfair text-xl md:text-2xl font-bold text-brown-700 capitalize">
          {{ categoriaActiva === 'todos' ? 'Toda la Colección' : categoriaActiva }}
        </h2>
        <p class="text-xs text-brown-400 mt-0.5">
          {{ productosFiltrados.length }} producto{{ productosFiltrados.length !== 1 ? 's' : '' }}
          <template v-if="productosFiltrados.length > ITEMS_PER_PAGE">
            · Página {{ paginaActual }} de {{ totalPaginas }}
          </template>
        </p>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-if="productosFiltrados.length === 0" class="text-center py-20">
      <div class="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search :size="30" class="text-brown-400" />
      </div>
      <p class="font-playfair text-xl text-brown-600">No encontramos resultados</p>
      <p class="text-sm text-brown-400 mt-2">Prueba con otra búsqueda o categoría</p>
      <button @click="limpiarFiltros" class="mt-4 bg-brown-600 text-cream-50 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-brown-500 transition-colors">
        Limpiar filtros
      </button>
    </div>

    <!-- Grid -->
    <div v-else>
      <TransitionGroup
        tag="div"
        :class="viewMode === 'grid'
          ? 'relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5'
          : 'relative flex flex-col gap-3'"
        name="product-grid"
      >
        <ProductCard
          v-for="producto in productosPaginados"
          :key="producto.id"
          :producto="producto"
          class=""
        />
      </TransitionGroup>

      <!-- Pagination -->
      <div v-if="totalPaginas > 1" class="flex items-center justify-center gap-2 mt-10">
        <button
          @click="irPagina(paginaActual - 1)"
          :disabled="paginaActual <= 1"
          class="p-2 rounded-lg border border-cream-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream-100"
        >
          <ChevronLeft :size="18" class="text-brown-500" />
        </button>

        <button
          v-for="pag in rangoPaginas"
          :key="pag"
          @click="irPagina(pag)"
          class="min-w-[36px] h-9 rounded-lg text-xs font-semibold transition-all border"
          :class="pag === paginaActual
            ? 'bg-brown-600 text-cream-50 border-brown-600'
            : 'bg-white text-brown-500 border-cream-200 hover:bg-cream-100'"
        >
          {{ pag }}
        </button>

        <button
          @click="irPagina(paginaActual + 1)"
          :disabled="paginaActual >= totalPaginas"
          class="p-2 rounded-lg border border-cream-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream-100"
        >
          <ChevronRight :size="18" class="text-brown-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-grid-move,
.product-grid-enter-active,
.product-grid-leave-active {
  transition: all 0.4s ease;
}
.product-grid-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.product-grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.product-grid-leave-active {
  position: absolute;
}
</style>
