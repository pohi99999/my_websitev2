import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Alap konfigurációk
  root: '.', // A projekt gyökere (ahol az index.html van)
  
  // Build-specifikus beállítások
  build: {
    // 1. Build kimeneti mappa beállítása
    outDir: 'dist',
    
    // 2. Minifikáció bekapcsolása (alapértelmezett a 'terser', ami hatékony)
    minify: 'terser',
    
    // 3. Source map generálás kikapcsolása production-ben
    sourcemap: command !== 'build' ? 'inline' : false,
    
    // 4. Asset optimalizálás (Vite ezt alapból kezeli, pl. kis képeket inline-ol)
    assetsInlineLimit: 4096, // 4KB alatti assetek beágyazása
    
    // 5. Tree shaking (a Rollup bundler alapértelmezetten végzi)
    rollupOptions: {
      output: {
        // Fájlok szétválasztása a jobb cache-elés érdekében
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  
  // Fejlesztői szerver beállításai
  server: {
    port: 3000,
    open: true, // Automatikusan megnyitja a böngészőt
  },
}));
