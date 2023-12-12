import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineNuxtConfig({
  app: {
    head: {
        viewport: 'width=device-width, initial-scale=1',
        title: '28遊戲',
        meta: [
            { name: 'description', content: '28遊戲' },
            { name: 'theme-color', content: '#06b6d4' },
            { property: 'og:title', content: '28遊戲' },
            { property: 'og:description', content: '28遊戲' },
        ],
    },
},
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
  devtools: { enabled: true },
  "vite": {
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        symbolId: '[dir]/[name]',
        customDomId: '__svg__icons__dom__',
      }),
    ],
  },
 
})
