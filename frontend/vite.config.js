import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true, // Recommended for easier debugging of production builds
  },
  server: {
    port: 5173, // Default Vite port, can be customized
    proxy: {
      // Proxy API requests to the backend server during development
      // This allows using relative paths like '/api/scores' in frontend code
      // even when the Vite dev server and backend server are on different ports.
      '/api': {
        target: 'http://localhost:9000', // Backend server address
        changeOrigin: true, // Recommended for virtual hosted sites
        // secure: false, // Uncomment if backend is on https with self-signed cert
      },
    },
  },
});
