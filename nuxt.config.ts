import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  router: {
    middleware: ['auth.global'], // Middleware de autenticación global
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api/v1', // Define tu `apiBase` aquí
      url: process.env.PUBLIC_URL || '',
    },
  },
  //yokese si pusheo esta verga o no
  modules: [
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/plausible',
  ],

  ui: {
    global: true,
    icons: ['solar', 'tabler', 'octicon', 'devicon', 'logos'],
  },

  plausible: {
    domain: process.env.PLAUSIBLE_DOMAIN,
    apiHost: process.env.PLAUSIBLE_API_HOST || 'https://plausible.io',
    ignoredHostnames: ['localhost'],
  },

  compatibilityDate: '2024-08-21',
})
