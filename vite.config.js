import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  // Caminho relativo — funciona em qualquer subpath do GitHub Pages
  // sem precisar editar com o nome do repositório
  base: './',
  build: {
    rollupOptions: {
      input: {
        // Página principal (React/Vite)
        main: resolve(__dirname, 'index.html'),
        // Página do evento HUMIC (standalone: React via CDN + Babel inline).
        // Precisa estar aqui senão o `vite build` não a copia para ./dist
        humic: resolve(__dirname, 'humic.html'),
      },
    },
  },
})
