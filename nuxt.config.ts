import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineNuxtConfig({
  app: {
    head: {
        viewport: 'width=device-width, initial-scale=1',
        title: '猜歌',
        meta: [
            { name: 'description', content: '猜歌' },
            { name: 'theme-color', content: 'var(--theme)' },
            { property: 'og:title', content: '猜歌' },
            { property: 'og:description', content: '猜歌' },
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
