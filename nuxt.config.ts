// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{purple.50}',
      100: '{purple.100}',
      200: '{purple.200}',
      300: '{purple.300}',
      400: '{purple.400}',
      500: '{purple.500}',
      600: '{purple.600}',
      700: '{purple.700}',
      800: '{purple.800}',
      900: '{purple.900}',
      950: '{purple.950}'
    }
  }
});

export default defineNuxtConfig({
  app: {
    head: {
      title: "CronoWOD",
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  css: [
    "@/assets/main.css",
    "primeicons/primeicons.css",
  ],
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
      theme: {
        preset: MyPreset
      },
      ripple: true
    },
  }
})
