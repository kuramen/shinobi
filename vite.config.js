import { fileURLToPath, URL } from 'url'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "@/assets/styles/_variables.scss"; @import "@/assets/styles/_fonts.scss";` }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
        define: {
            global: 'globalThis'
        },
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
})
