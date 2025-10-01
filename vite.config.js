import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
const baseURL = process.env.NODE_ENV === 'development' ? '/' : '/seiv2025/p2/t5/'
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
    port: 8081
    },
    base: baseURL
})
