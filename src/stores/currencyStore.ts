import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TASA_CAMBIO } from '../data/config'

export const useCurrencyStore = defineStore('currency', () => {
  // Estado
  const currency = ref<'USD' | 'BS'>('USD')
  const tasaCambio = ref(TASA_CAMBIO)
  
  // Getters
  const isUSD = computed(() => currency.value === 'USD')
  const isBS = computed(() => currency.value === 'BS')
  
  // Actions
  function setCurrency(newCurrency: 'USD' | 'BS') {
    currency.value = newCurrency
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred-currency', newCurrency)
    }
  }
  
  function toggleCurrency() {
    currency.value = currency.value === 'USD' ? 'BS' : 'USD'
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred-currency', currency.value)
    }
  }
  
  function loadCurrencyFromStorage() {
    try {
      if (typeof localStorage === 'undefined') return
      const saved = localStorage.getItem('preferred-currency') as 'USD' | 'BS' | null
      if (saved && (saved === 'USD' || saved === 'BS')) {
        currency.value = saved
      }
    } catch (e) {
      console.warn('Error loading currency from localStorage:', e)
    }
  }
  
  function convertirPrecio(precioUSD: number): string {
    if (currency.value === 'USD') {
      return `$${precioUSD.toFixed(2)}`
    } else {
      const precioBS = precioUSD * tasaCambio.value
      return `Bs. ${precioBS.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    }
  }
  
  // Cargar moneda guardada al inicializar
  loadCurrencyFromStorage()
  
  return {
    // Estado
    currency,
    tasaCambio,
    // Getters
    isUSD,
    isBS,
    // Actions
    setCurrency,
    toggleCurrency,
    loadCurrencyFromStorage,
    convertirPrecio
  }
})