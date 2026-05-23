<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DollarSign } from 'lucide-vue-next'

// Estado local simple
const currency = ref<'USD' | 'BS'>('USD')

// Solo cargar desde localStorage en el cliente
onMounted(() => {
  const saved = localStorage.getItem('preferred-currency') as 'USD' | 'BS' | null
  if (saved === 'USD' || saved === 'BS') {
    currency.value = saved
  }
})

const toggleCurrency = () => {
  currency.value = currency.value === 'USD' ? 'BS' : 'USD'
  localStorage.setItem('preferred-currency', currency.value)
}
</script>

<template>
  <button
    @click="toggleCurrency"
    class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
    :class="currency === 'USD' 
      ? 'bg-cream-100 text-brown-700 hover:bg-cream-200' 
      : 'bg-brown-600 text-cream-100 hover:bg-brown-500'"
  >
    <DollarSign :size="14" />
    <span>{{ currency === 'USD' ? 'USD' : 'BS' }}</span>
    <span class="text-[10px] opacity-60">▼</span>
  </button>
</template>