import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Producto } from '../data/productos'
import { TASA_CAMBIO, WHATSAPP_NUMERO } from '../data/config'

export interface CartItem extends Producto {
  cantidad: number
}

const CART_STORAGE_KEY = 'agape-cart-items'

function loadCartFromStorage(): CartItem[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Error loading cart from localStorage:', e)
  }
  return []
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.warn('Error saving cart to localStorage:', e)
  }
}

export const useCartStore = defineStore('cart', () => {
  // Inicializar con datos guardados
  const items = ref<CartItem[]>(loadCartFromStorage())
  const isOpen = ref(false)
  const currentCurrency = ref<'USD' | 'BS'>('USD')
  const tasaCambio = ref(TASA_CAMBIO)
  const toastMessage = ref('')
  let toastTimer: ReturnType<typeof setTimeout>

  const totalItems = computed(() =>
    items.value.reduce((acc, item) => acc + item.cantidad, 0)
  )

  const totalPriceUSD = computed(() =>
    items.value.reduce((acc, item) => {
      const precio = item.enOferta && item.precioOferta ? item.precioOferta : item.precio
      return acc + precio * item.cantidad
    }, 0)
  )

  const totalPriceBS = computed(() =>
    totalPriceUSD.value * tasaCambio.value
  )

  // Guardar en localStorage cada vez que cambien los items
  watch(items, (newItems) => {
    saveCartToStorage(newItems)
  }, { deep: true })

  function setCurrency(currency: 'USD' | 'BS') {
    currentCurrency.value = currency
  }

  function getPrecioFormateado(precioUSD: number): string {
    if (currentCurrency.value === 'USD') {
      return `$${precioUSD.toFixed(2)}`
    } else {
      const precioBS = (precioUSD * tasaCambio.value)
      return `Bs. ${precioBS.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    }
  }

  function agregarAlCarrito(producto: Producto) {
    const existente = items.value.find(i => i.id === producto.id)
    if (existente) {
      existente.cantidad++
    } else {
      items.value.push({ ...producto, cantidad: 1 })
    }
    isOpen.value = true
    showToast(`${producto.nombre} añadido al carrito`)
  }

  function showToast(msg: string) {
    toastMessage.value = msg
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toastMessage.value = '' }, 2500)
  }

  function eliminarDelCarrito(id: number) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function cambiarCantidad(id: number, cantidad: number) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      if (cantidad <= 0) {
        eliminarDelCarrito(id)
      } else {
        item.cantidad = cantidad
      }
    }
  }

  function vaciarCarrito() {
    items.value = []
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function generarMensajeWhatsapp() {
    const numero = WHATSAPP_NUMERO
    const moneda = currentCurrency.value === 'USD' ? 'USD' : 'Bs.'
    
    let mensaje = '🌸 *Hola, quiero realizar un pedido en Agape Collection Parfum:*\n\n'

    items.value.forEach(item => {
      const precioUSD = item.enOferta && item.precioOferta ? item.precioOferta : item.precio
      const precioMoneda = currentCurrency.value === 'USD' 
        ? `$${precioUSD.toFixed(2)}` 
        : `Bs. ${(precioUSD * tasaCambio.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      
      const subtotalMoneda = currentCurrency.value === 'USD'
        ? `$${(precioUSD * item.cantidad).toFixed(2)}`
        : `Bs. ${(precioUSD * tasaCambio.value * item.cantidad).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

      mensaje += `▪️ *${item.nombre}*\n`
      mensaje += `   Cantidad: ${item.cantidad}\n`
      mensaje += `   Precio unitario: ${precioMoneda}\n`
      mensaje += `   Subtotal: ${subtotalMoneda}\n\n`
    })

    const totalMoneda = currentCurrency.value === 'USD'
      ? `$${totalPriceUSD.value.toFixed(2)}`
      : `Bs. ${totalPriceBS.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

    mensaje += `💰 *Total: ${totalMoneda}*\n\n`
    mensaje += `Quedo atento/a para coordinar el pago y envío. ¡Gracias! 🙏`

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  return {
    items,
    isOpen,
    totalItems,
    totalPriceUSD,
    totalPriceBS,
    currentCurrency,
    tasaCambio,
    toastMessage,
    getPrecioFormateado,
    setCurrency,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    toggleCart,
    generarMensajeWhatsapp
  }
})