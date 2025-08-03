import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  optimizeDeps: {
    include: [
      'date-fns/format',
      'react-icons/fi',
      'react-icons/fa'
    ],
  },
})
