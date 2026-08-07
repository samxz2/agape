import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Producto } from '../data/productos'
import { WHATSAPP_NUMERO } from '../data/config'
import { useCurrencyStore } from './currencyStore'
import { pinia } from '../plugins/pinia'

export interface CartItem extends Producto {
  cantidad: number
}

const CART_STORAGE_KEY = 'agape-cart-items'

function hasLocalStorage(): boolean {
  try {
    return typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
  } catch {
    return false
  }
}

function isValidCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'number' &&
    typeof v.nombre === 'string' &&
    typeof v.categoria === 'string' &&
    typeof v.precio === 'number' &&
    typeof v.imagen === 'string' &&
    typeof v.cantidad === 'number' &&
    v.cantidad > 0
  )
}

function loadCartFromStorage(): CartItem[] {
  if (!hasLocalStorage()) return []
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed: unknown = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed.filter(isValidCartItem)
      }
    }
  } catch (e) {
    console.warn('Error loading cart from localStorage:', e)
  }
  return []
}

function saveCartToStorage(items: CartItem[]) {
  if (!hasLocalStorage()) return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.warn('Error saving cart to localStorage:', e)
  }
}

export const useCartStore = defineStore('cart', () => {
  const currencyStore = useCurrencyStore(pinia)
  // Inicializar con datos guardados
  const items = ref<CartItem[]>(loadCartFromStorage())
  const isOpen = ref(false)
  const toastMessage = ref('')
  const showVaciarConfirm = ref(false)
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
    totalPriceUSD.value * currencyStore.tasaCambio
  )

  // Guardar en localStorage cada vez que cambien los items
  watch(items, (newItems) => {
    saveCartToStorage(newItems)
  }, { deep: true })

  function agregarAlCarrito(producto: Producto, cantidad = 1) {
    const existente = items.value.find(i => i.id === producto.id)
    if (existente) {
      existente.cantidad += cantidad
    } else {
      items.value.push({ ...producto, cantidad })
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

  function solicitarVaciar() {
    showVaciarConfirm.value = true
  }

  function confirmarVaciar() {
    items.value = []
    showVaciarConfirm.value = false
    if (hasLocalStorage()) {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
    showToast('Carrito vaciado')
  }

  function cancelarVaciar() {
    showVaciarConfirm.value = false
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function generarMensajeWhatsapp() {
    const numero = WHATSAPP_NUMERO
    const enUSD = currencyStore.currency === 'USD'
    const formatear = (precioUSD: number) => enUSD
      ? `$${precioUSD.toFixed(2)}`
      : `Bs. ${(precioUSD * currencyStore.tasaCambio).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

    let mensaje = '🌸 *Hola, quiero realizar un pedido en Agape Collection Parfum:*\n\n'

    items.value.forEach(item => {
      const precioUSD = item.enOferta && item.precioOferta ? item.precioOferta : item.precio

      mensaje += `▪️ *${item.nombre}*\n`
      mensaje += `   Cantidad: ${item.cantidad}\n`
      mensaje += `   Precio unitario: ${formatear(precioUSD)}\n`
      mensaje += `   Subtotal: ${formatear(precioUSD * item.cantidad)}\n\n`
    })

    const totalMoneda = formatear(totalPriceUSD.value)

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
    toastMessage,
    showVaciarConfirm,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    solicitarVaciar,
    confirmarVaciar,
    cancelarVaciar,
    toggleCart,
    generarMensajeWhatsapp
  }
})
