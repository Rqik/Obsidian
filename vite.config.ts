import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import eslint from 'vite-plugin-eslint2';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(),
    // tsconfigPaths(),
    // tailwindcss(),
    // eslint()
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
