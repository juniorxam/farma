# Deploy no GitHub Pages

Este projeto foi configurado para ser publicado no **GitHub Pages**. Como é uma aplicação baseada em **Vite** (React), siga os passos abaixo para realizar o deploy:

## Opção 1: GitHub Actions (Recomendado)

A forma mais fácil e automatizada é usar o GitHub Actions.

1.  Crie uma pasta `.github/workflows` na raiz do seu projeto.
2.  Crie um arquivo chamado `deploy.yml` dentro dessa pasta com o seguinte conteúdo:

```yaml
name: Deploy para GitHub Pages

on:
  push:
    branches: ["main"] # Altere para o nome da sua branch principal

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3.  No seu repositório no GitHub, vá em **Settings** > **Pages**.
4.  Em **Build and deployment** > **Source**, selecione **GitHub Actions**.

## Opção 2: Deploy Manual

Se preferir fazer o build localmente e subir apenas os arquivos gerados:

1.  Execute `pnpm install` e depois `pnpm build`.
2.  Os arquivos para o GitHub Pages estarão na pasta `dist`.
3.  Você pode subir o conteúdo da pasta `dist` para uma branch chamada `gh-pages` ou configurar o GitHub Pages para ler da pasta `docs` (renomeando `dist` para `docs`).

---

**Nota sobre Roteamento:**
Este projeto usa `wouter` para roteamento. Para garantir que as rotas funcionem corretamente ao recarregar a página no GitHub Pages (que não suporta Single Page Applications nativamente), o projeto foi configurado com `base: "./"` no `vite.config.ts`. Se encontrar problemas com links profundos ao recarregar, considere usar um componente de `HashRouter` ou adicionar um `404.html` que redirecione para o `index.html`.
