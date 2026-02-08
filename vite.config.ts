import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
    server: {
    allowedHosts: [
        '4995-2803-d90-f024-9000-3d43-db2f-b5d-5d30.ngrok-free.app'
      ]
    },
})
