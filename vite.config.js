import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './lib'),
      '@pub': path.resolve(__dirname, './public')
    }
  },
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})
