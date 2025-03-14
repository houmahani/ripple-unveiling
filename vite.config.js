import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import eslint from 'vite-plugin-eslint'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    glsl({
      include: [/\.glsl$/, /\.vert$/, /\.frag$/],
      defaultExtension: 'glsl',
    }),
    viteImagemin({
      webp: {
        quality: 75, // Adjust quality (0-100)
      },
      pngquant: {
        quality: [0.6, 0.8], // Compress PNG before converting
      },
    }),
  ],
  server: {
    hmr: true,
    overlay: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '',
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
})
