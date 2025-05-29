import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Use '/' for local dev; change to '/se_project_react/' for GitHub Pages
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
});
