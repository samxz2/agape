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

  function hasLocalStorage(): boolean {
    try {
      return typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
    } catch {
      return false
    }
  }

  // Actions
  function setCurrency(newCurrency: 'USD' | 'BS') {
    currency.value = newCurrency
    if (hasLocalStorage()) {
      localStorage.setItem('preferred-currency', newCurrency)
    }
  }

  function toggleCurrency() {
    setCurrency(currency.value === 'USD' ? 'BS' : 'USD')
  }

  function loadCurrencyFromStorage() {
    try {
      if (!hasLocalStorage()) return
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
