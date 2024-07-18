<script setup>
import { useStorage } from '@vueuse/core'

const workouts = useStorage('cronowod/workouts', {
  v: "0.1",
  items: []
}, localStorage, { mergeDefaults: true });

const fontSize = ref(3.5);
const increaseFontSize = () => { fontSize.value += 0.5; };
const decreaseFontSize = () => { fontSize.value -= 0.5; };
</script>

<template>
  <Splitter style="height: calc(100vh - var(--topbar-height))">
    <SplitterPanel style="overflow: auto; position: relative">
      <div v-if="workouts.items.length <= 0">
        <p>No workouts found</p>
        <Button @click="navigateTo('/workout')" label="Create Workout" />
      </div>
      <Tabs v-else :value="workouts.items[0].id">
        <TabList style="position: sticky; top: 0; left: 0; right: 0;">
          <div style="position: absolute; top: 0.3em; right: 0.3em; z-index: 9; display: flex; gap: 0.5em;">
            <Button @click="increaseFontSize" icon="pi pi-search-plus" />
            <Button @click="decreaseFontSize" icon="pi pi-search-minus" />
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
    <SplitterPanel>
      <timers />
    </SplitterPanel>
  </Splitter>
</template>
