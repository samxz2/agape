// Tasa de cambio USD → Bs. basada en Binance P2P (referencia estándar Venezuela).
// Actualizar regularmente según el precio del día.
export const TASA_CAMBIO = Number(import.meta.env.PUBLIC_TASA_CAMBIO) || 800
export const WHATSAPP_NUMERO = import.meta.env.PUBLIC_WHATSAPP_NUMERO || '584127050149'
