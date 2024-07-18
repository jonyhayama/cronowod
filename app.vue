<script setup>
const { isFullscreen } = useFullscreen()
</script>

<template>
  <div class="layout-wrapper" :class="{ 'is-fullscreen': isFullscreen }">
    <Toast />
    <topbar />
    <nuxt-page />
  </div>
</template>
