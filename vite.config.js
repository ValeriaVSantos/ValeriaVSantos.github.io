import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Caminho relativo — funciona em qualquer subpath do GitHub Pages
  base: './',
  // OBS: humic.html NÃO entra aqui. Ele é uma página standalone (React via CDN
  // + Babel inline) e vive em public/humic.html, que o Vite copia para ./dist
  // sem processar. Isso evita que o build quebre tentando compilá-la.
})
