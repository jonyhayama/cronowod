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
  // TODO: Add Full Screen button
  // {
  //   label: 'Full Screen',
  //   icon: 'pi pi-fw pi-window-maximize',
  // }
];

</script>

<template>
  <Menubar :model="items" :pt="{
    root: {
      class: 'layout-topbar',
    }
  }">
    <template #start>
      CronoWOD
    </template>
  </Menubar>
</template>

<style scoped>
.layout-topbar {
  border-radius: 0;
  border-top: none;
  border-right: none;
  border-left: none;
  justify-content: space-between;
  height: var(--topbar-height);
}
</style>
