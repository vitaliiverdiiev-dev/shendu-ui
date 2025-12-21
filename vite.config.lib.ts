import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Plugin to copy the theme-only CSS file after build
const copyThemeOnlyPlugin = () => ({
  name: 'copy-theme-only',
  closeBundle() {
    const srcPath = path.resolve(__dirname, 'src/styles/theme-only.css');
    const destDir = path.resolve(__dirname, 'dist');
    const destPath = path.resolve(destDir, 'theme.css');

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    if (existsSync(srcPath)) {
      copyFileSync(srcPath, destPath);
      // eslint-disable-next-line no-console
      console.info('✓ Copied theme-only.css to dist/theme.css');
    }
  },
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.lib.json',
      insertTypesEntry: true,
    }),
    copyThemeOnlyPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: false,
  },
});
