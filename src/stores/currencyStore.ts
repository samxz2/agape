import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCurrencyStore = defineStore('currency', () => {
  // Estado
  const currency = ref<'USD' | 'BS'>('USD')
  
  // Getters
  const isUSD = computed(() => currency.value === 'USD')
  const isBS = computed(() => currency.value === 'BS')
  
  // Actions
  function setCurrency(newCurrency: 'USD' | 'BS') {
    currency.value = newCurrency
    // Guardar en localStorage para persistencia
    localStorage.setItem('preferred-currency', newCurrency)
  }
  
  function toggleCurrency() {
    currency.value = currency.value === 'USD' ? 'BS' : 'USD'
    localStorage.setItem('preferred-currency', currency.value)
  }
  
  function loadCurrencyFromStorage() {
    const saved = localStorage.getItem('preferred-currency') as 'USD' | 'BS' | null
    if (saved && (saved === 'USD' || saved === 'BS')) {
      currency.value = saved
    }
  }
  
  // Cargar moneda guardada al inicializar
  loadCurrencyFromStorage()
  
  return {
    // Estado
    currency,
    // Getters
    isUSD,
    isBS,
    // Actions
    setCurrency,
    toggleCurrency,
    loadCurrencyFromStorage
  }
})