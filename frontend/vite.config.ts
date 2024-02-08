import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
})
=======
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:9109",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
>>>>>>> 9e397c69e687744028fb19cfb92bfaed8f387153
