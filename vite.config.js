import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        try {
          // Copy index.html to 404.html for GitHub Pages SPA support
          copyFileSync(
            resolve(__dirname, 'dist/index.html'),
            resolve(__dirname, 'dist/404.html')
          )
        } catch (error) {
          console.error('Failed to copy 404.html for GitHub Pages SPA support:', error)
        }
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
