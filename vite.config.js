import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    filename: './dist/status.html',
    // template: 'network'
    // template: 'sunburst'
    template: 'treemap'
  })
  ],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib'),
      '@pub': path.resolve(__dirname, './public'),
      '@cmp': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
    },
  }
})
