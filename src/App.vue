<template>
  <router-view />
</template>
<script setup>
import { onBeforeUnmount } from 'vue';
import { useUserStore } from '@/stores/user'
import socket from '@/utils/socket'
onBeforeUnmount(() => {
  const store = useUserStore()
  if (performance.navigation.type !== 1) {
    if (store.userId) {
      socket.emit('disconnected', store.userId)
    }
  }
})
</script>
<style scoped></style>
