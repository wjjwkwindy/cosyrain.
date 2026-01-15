import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import Markdown from 'unplugin-vue-markdown/vite';
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts';
import MarkdownItShiki from '@shikijs/markdown-it';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    svgLoader(),
    Markdown({
      wrapperComponent: 'ArticleWrapper',
      headEnabled: true,
      async markdownItSetup(md) {
        md.use(
          await MarkdownItShiki({
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
        );
        md.use(MarkdownItGitHubAlerts);
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/variables.less";`,
      },
    },
  },
});
