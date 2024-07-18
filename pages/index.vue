<script setup>
import { useStorage } from '@vueuse/core'

const workouts = useStorage('cronowod/workouts', {
  v: "0.1",
  items: []
}, localStorage, { mergeDefaults: true });
</script>

<template>
  <Splitter>
    <SplitterPanel>
      <div v-if="workouts.items.length <= 0">
        <p>No workouts found</p>
        <Button @click="navigateTo('/workout')" label="Create Workout" />
      </div>
      <Tabs v-else :value="workouts.items[0].id">
        <TabList>
          <Tab v-for="workout in workouts.items" :value="workout.id">{{ workout.name }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="workout in workouts.items" :value="workout.id">
            <div style="white-space: pre; font-size: 3.5em; line-height: 1em;">
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
