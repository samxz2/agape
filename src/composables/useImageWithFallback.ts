import { ref } from 'vue'
import { FALLBACK_IMAGE } from '../data/constants'

const MAX_RETRIES = 2
const RETRY_DELAY = 1500

export function useImageWithFallback() {
  const loaded = ref(false)
  const failed = ref(false)

  function handleLoad() {
    loaded.value = true
    failed.value = false
  }

  function handleError(event: Event) {
    const img = event.target as HTMLImageElement
    const retries = Number(img.dataset.retries ?? '0')

    if (retries < MAX_RETRIES) {
      img.dataset.retries = String(retries + 1)
      failed.value = false
      setTimeout(() => {
        img.src = img.src
      }, RETRY_DELAY)
    } else {
      img.src = FALLBACK_IMAGE
      failed.value = true
      loaded.value = true
    }
  }

  return { loaded, failed, handleLoad, handleError }
}
