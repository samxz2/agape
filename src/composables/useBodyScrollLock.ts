// Bloqueo del scroll del body con contador compartido: varios overlays
// (carrito, modal de producto) pueden pedir el lock a la vez y solo se
// libera cuando todos terminaron.
let lockCount = 0

export function lockBodyScroll() {
  lockCount += 1
  document.body.style.overflow = 'hidden'
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
  }
}
