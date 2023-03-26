import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  root : path.resolve(__dirname, 'src'),
  base: './',
  publicDir: path.resolve(__dirname, 'public'),
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@src' : path.resolve(__dirname, 'src'),
      // '~bootstrap': path.resolve(__dirname,'node_modules/bootstrap'),
    }
  },
})
