import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    origin: 'https://d612-2800-98-1619-1ec2-8bd5-a0cd-3092-8c39.ngrok-free.app'
  }
})
