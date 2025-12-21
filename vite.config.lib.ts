import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Plugin to build the theme-only CSS file with all imports inlined
const buildThemeOnlyPlugin = () => ({
  name: 'build-theme-only',
  closeBundle() {
    const stylesDir = path.resolve(__dirname, 'src/styles');
    const destDir = path.resolve(__dirname, 'dist');
    const destPath = path.resolve(destDir, 'theme.css');

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    // Read all theme CSS files and concatenate them
    const files = ['root.css', 'theme-light.css', 'theme-dark.css', 'theme-inline.css'];
    let themeContent = `/*
 * Shendu UI Theme Variables
 * These CSS variables use -ui suffix to prevent conflicts with other UI libraries.
 * Use this file when importing shendu-ui into a project that already has Tailwind configured.
 */

`;

    for (const file of files) {
      const filePath = path.resolve(stylesDir, file);
      if (existsSync(filePath)) {
        const content = readFileSync(filePath, 'utf-8');
        themeContent += `/* ${file} */\n${content}\n\n`;
      }
    }

    writeFileSync(destPath, themeContent);
    // eslint-disable-next-line no-console
    console.info('✓ Built theme.css with all CSS variables');
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
