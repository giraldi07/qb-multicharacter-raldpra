import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './', // ✅ PENTING! Agar path asset relatif saat dijalankan dalam FiveM
  build: {
    outDir: '../html', // ✅ Output langsung ke folder html/
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    strictPort: true,
    cors: true,
  },
})
