<script setup>
const minutes = ref(0);
const seconds = ref(-3);

const formatNumber = (value) => {
  if (value < 0) { return '00'; }
  return value < 10 ? `0${value}` : value;
};

const tick = () => {
  if (seconds.value === 59) {
    seconds.value = 0;
    minutes.value++;
  } else {
    seconds.value++;
  }
};

const { pause, resume, isActive } = useIntervalFn(tick, 1000, { immediate: false });

const reset = () => {
  pause();
  minutes.value = 0;
  seconds.value = -3;
};

const isPaused = computed(() => !isActive.value && (minutes.value !== 0 || seconds.value !== 0));
</script>

<template>
  <div style="display: flex; align-items: center; justify-content: center; height: 100%">
    <div style="text-align: center;">
      <template v-if="isActive && seconds < 0">
        <div style="font-weight: bold; font-size: 8em; line-height: 1em;">{{ Math.abs(seconds) }}</div>
        <div style="font-weight: bold; font-size: 4em; line-height: 1em;">Get Ready!</div>
      </template>
      <template v-else>
        <div style="font-weight: bold; font-size: 8em; font-variant-numeric: tabular-nums;">
          {{ formatNumber(minutes) }}:{{ formatNumber(seconds) }}
        </div>
        <div style="display: flex; gap: 0.5em; justify-content: center;">
          <template v-if="isActive">
            <Button @click="pause" icon="pi pi-pause" />
          </template>
          <templte v-if="!isActive">
            <Button @click="resume" icon="pi pi-play" />
          </templte>
          <template v-if="isPaused">
            <Button @click="reset" icon="pi pi-replay" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
