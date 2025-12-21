import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Plugin to build the theme-only CSS file with pure CSS variables (no Tailwind directives)
const buildThemeOnlyPlugin = () => ({
  name: 'build-theme-only',
  closeBundle() {
    const stylesDir = path.resolve(__dirname, 'src/styles');
    const destDir = path.resolve(__dirname, 'dist');
    const destPath = path.resolve(destDir, 'theme.css');

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    // Read CSS files that contain pure CSS (no @theme directives)
    // root.css has :root variables, theme-dark.css has .dark variables
    const rootCss = readFileSync(path.resolve(stylesDir, 'root.css'), 'utf-8');
    const darkCss = readFileSync(path.resolve(stylesDir, 'theme-dark.css'), 'utf-8');

    const themeContent = `/*
 * Shendu UI Theme Variables (Isolated)
 * These CSS variables use -ui suffix to prevent conflicts with other UI libraries.
 * Import this file to use shendu-ui components without affecting your app's styles.
 *
 * Usage: import '@shendu-ui/core/theme.css';
 */

/* ===== Light Theme Variables ===== */
${rootCss}

/* ===== Dark Theme Variables ===== */
${darkCss}
`;

    writeFileSync(destPath, themeContent);
    // eslint-disable-next-line no-console
    console.info('✓ Built theme.css from CSS source files');
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
    buildThemeOnlyPlugin(),
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
