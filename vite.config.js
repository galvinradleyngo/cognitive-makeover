import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cognitive-makeover/', // <-- ADD THIS LINE (must match your exact repo name)
})
