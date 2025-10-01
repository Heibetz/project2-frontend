import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/courses-t5/'
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/courses-t5': {
        target: baseURL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
