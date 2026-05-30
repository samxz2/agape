<script setup lang="ts">
import { useCurrencyStore } from '../stores/currencyStore'
import { pinia } from '../plugins/pinia'

const currencyStore = useCurrencyStore(pinia)
</script>

<template>
  <button
    @click="currencyStore.toggleCurrency()"
    class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
    :class="currencyStore.currency === 'USD'
      ? 'bg-cream-100 text-brown-600 hover:bg-cream-200'
      : 'bg-brown-500 text-cream-50 hover:bg-brown-400'"
  >
    <span>{{ currencyStore.currency === 'USD' ? '$ USD' : 'Bs.' }}</span>
  </button>
</template>