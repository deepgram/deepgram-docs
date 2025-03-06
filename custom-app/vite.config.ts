import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../fern/dist',
    rollupOptions: {
      output: {
        entryFileNames: `output.js`,
        assetFileNames: `output.[ext]`,
        inlineDynamicImports: true,
      }
    }
  }
})
