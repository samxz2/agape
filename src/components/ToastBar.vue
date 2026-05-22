<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { pinia } from '../plugins/pinia'
import { CheckCircle } from 'lucide-vue-next'

const cart = useCartStore(pinia)
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300"
      :class="cart.toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'"
    >
      <div class="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold">
        <CheckCircle :size="18" />
        {{ cart.toastMessage }}
      </div>
    </div>
  </Teleport>
</template>
