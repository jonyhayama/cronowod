<script setup>
const items = [
  {
    label: 'Home',
    command: () => { navigateTo('/') }
  },
  {
    label: 'About',
    command: () => { navigateTo('/about') }
  },
  {
    label: 'Workouts',
    command: () => { navigateTo('/workouts') }
  }
];
const { isFullscreen, enter, exit, toggle, isSupported } = useFullscreen()
</script>

<template>
  <Menubar v-show="!isFullscreen" :model="items" :pt="{
    root: {
      class: 'layout-topbar',
    }
  }">
    <template #start>
      <span style="font-weight: bold" @click="navigateTo('/')">CronoWOD</span>
    </template>
    <template #end v-if="isSupported">
      <Button icon="pi pi-window-maximize" severity="secondary" @click="enter" />
    </template>
  </Menubar>
  <Button
    v-show="isFullscreen"
    icon="pi pi-window-minimize"
    severity="secondary"
    @click="exit"
    style="position: absolute; right: 0.3em; top: 0.3em; z-index: 9"
  />
</template>

<style scoped>
.layout-topbar {
  border-radius: 0;
  border-top: none;
  border-right: none;
  border-left: none;
  height: var(--topbar-height);
}

.layout-topbar :deep(.p-menubar-button),
.layout-topbar :deep(.p-menubar-root-list) {
  margin-left: auto;
}

.layout-topbar :deep(.p-menubar-end) {
  margin-left: 0;
}
</style>
