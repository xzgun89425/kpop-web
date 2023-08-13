import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

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
  "nitro": {
    "plugins": ["~/server/db/index.js"],
  }, 
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
