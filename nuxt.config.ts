import process from 'node:process'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000/api/v1', // Define tu `apiBase` aquí
      url: process.env.PUBLIC_URL || '',
    },
  },

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
