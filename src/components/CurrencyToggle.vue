<script setup lang="ts">
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'
import { DollarSign } from 'lucide-vue-next'

const currencyStore = useCurrencyStore(pinia)
</script>

<template>
  <button
    @click="currencyStore.toggleCurrency()"
    class="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
    :class="currencyStore.currency === 'USD' 
      ? 'bg-cream-200/70 text-brown-600 hover:bg-cream-200' 
      : 'bg-brown-200/70 text-brown-700 hover:bg-brown-200'"
  >
    <DollarSign :size="14" />
    <span>{{ currencyStore.currency === 'USD' ? 'USD' : 'Bs.' }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-60">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </button>
</template>
