import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Caminho relativo — funciona em qualquer subpath do GitHub Pages
  // sem precisar editar com o nome do repositório
  base: './',
})
