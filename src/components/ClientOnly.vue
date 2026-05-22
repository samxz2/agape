<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})
</script>

<template>
  <div v-if="isClient">
    <slot />
  </div>
  <div v-else class="min-h-[400px] flex items-center justify-center">
    <div class="w-8 h-8 border-2 border-brown-300 border-t-brown-700 rounded-full animate-spin"></div>
  </div>
</template>