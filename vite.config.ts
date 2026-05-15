import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: { allow: ['..'] },
  },
  resolve: {
    alias: {
      '@ob': resolve(__dirname, '../../folder photo'),
    },
  },
})
