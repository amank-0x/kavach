import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const screeningApiUrl = process.env.VITE_SCREENING_API_URL || 'http://10.238.173.96:8000/screen-document'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_SCREENING_API_URL': JSON.stringify(screeningApiUrl),
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
