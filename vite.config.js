import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // or '/your-subpath/' if deploying under a subdirectory
  plugins: [react()],
})
