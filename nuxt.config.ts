// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['stores'],
  },
  modules: [
      [
          '@pinia/nuxt',
          '@nuxt/content',
          {
              autoImports: ['defineStore', 'acceptHMRUpdate'],
          },
      ],
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  devtools: { enabled: true }
})
