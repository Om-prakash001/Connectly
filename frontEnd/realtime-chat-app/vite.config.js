import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // only if using React



export default defineConfig({
  plugins: [react()], // keep if using React
})
