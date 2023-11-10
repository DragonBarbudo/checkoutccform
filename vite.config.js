import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components', '@iconify/vue'],
      types: [{
        from: '@iconify/vue',
        names: ['Icon']
      }]
    }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        { '@/stores/configuration': ['useConfigStore'] },
      ]
     })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
