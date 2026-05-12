# Valéria Vieira Santos · Portfolio Site

Vite + React 18 single-page site, deployed via GitHub Actions to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Hot-reload de JSX/CSS funciona automaticamente.

## Build de produção

```bash
npm run build      # gera ./dist
npm run preview    # serve o build localmente pra testar
```

## Deploy

Push pra branch `main` → o workflow em `.github/workflows/deploy.yml` faz tudo:

1. `npm ci`
2. `npm run build`
3. Publica `./dist` no GitHub Pages

**Antes do primeiro deploy**, configure no GitHub:
- Settings → Pages → Source: **GitHub Actions** (não "Deploy from a branch")

O `base` em `vite.config.js` está como `'./'` — isso faz os assets carregarem em qualquer subpath do GitHub Pages sem precisar editar com o nome do repo.

## Estrutura

```
index.html               Entry Vite
vite.config.js           Config (base relativo)
package.json
styles.css               Estilos globais
public/
  assets/valeria.jpg     Arquivos servidos como-estão
src/
  main.jsx               Mount do React
  app.jsx                Composição das seções
  hero.jsx               Canvas de rede neural (mouse-reactive)
  viz.jsx                Scatter plot de calibração
  data.js                Conteúdo (news, pubs, projects, etc.)
```

## Editar conteúdo

Praticamente tudo (news, publicações, talks, projetos, GitHub feed)
está em `src/data.js`. Editar lá e dar push — o site atualiza sozinho.

## Stack

- React 18.3
- Vite 5
- Sem CSS framework (estilos próprios em `styles.css`)
- Fontes: Geist + Geist Mono + Instrument Serif (Google Fonts)
