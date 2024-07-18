<script setup>
import { useStorage } from '@vueuse/core'

const workouts = useStorage('cronowod/workouts', {
  v: "0.1",
  items: []
}, localStorage, { mergeDefaults: true });

const fontSize = ref(3.5);
const increaseFontSize = () => { fontSize.value += 0.5; };
const decreaseFontSize = () => { fontSize.value -= 0.5; };

const isWorkoutsVisible = ref(true);
const toggleWorkoutsVisibility = () => { isWorkoutsVisible.value = !isWorkoutsVisible.value; };
</script>

<template>
  <Splitter style="height: calc(100vh - var(--topbar-height))">
    <SplitterPanel v-show="isWorkoutsVisible" style="overflow: auto; position: relative">
      <div v-if="workouts.items.length <= 0">
        <p>No workouts found</p>
        <Button @click="navigateTo('/workout')" label="Create Workout" />
      </div>
      <Tabs v-else :value="workouts.items[0].id">
        <TabList style="position: sticky; top: 0; left: 0; right: 0;">
          <div style="position: absolute; top: 0.3em; right: 0.3em; z-index: 9; display: flex; gap: 0.5em;">
            <Button @click="increaseFontSize" icon="pi pi-search-plus" severity="secondary" />
            <Button @click="decreaseFontSize" icon="pi pi-search-minus" severity="secondary" />
          </div>
          <Tab v-for="workout in workouts.items" :value="workout.id">{{ workout.name }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="workout in workouts.items" :value="workout.id">
            <div :style="`white-space: break-spaces; font-size: ${fontSize}em; line-height: 1em;`">
              {{ workout.description }}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SplitterPanel>
    <SplitterPanel style="position: relative">
      <Button
        @click="toggleWorkoutsVisibility" :icon="`pi pi-angle-${isWorkoutsVisible ? 'left': 'right'}`"
        style="position: absolute; left: 0.3em; top: 0.3em; z-index: 9;"
        severity="secondary"
      />
      <timers />
    </SplitterPanel>
  </Splitter>
</template>
