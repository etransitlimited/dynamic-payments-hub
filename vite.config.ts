
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Enable Fast Refresh for improved development experience
      fastRefresh: true,
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize development experience
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-toast',
      'recharts',
      'lucide-react'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  // Enhanced CSS processing
  css: {
    devSourcemap: true,
  },
  // Improved build configuration
  build: {
    // Target newer browsers for smaller bundles
    target: 'es2020',
    // Optimize build for faster loading
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    // Generate sourcemaps for production debugging
    sourcemap: mode === 'development',
    // Improved chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            // Individual @radix-ui packages instead of the entire namespace
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
            'tailwind-merge',
            'class-variance-authority'
          ],
          'animation-vendor': ['framer-motion', 'tsparticles-slim', 'react-tsparticles'],
          'chart-vendor': ['recharts', 'recharts-scale', 'd3-shape', 'd3-scale'],
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'utils': ['date-fns', 'clsx', 'sonner']
        },
        // Optimize chunk size and loading
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          return `assets/[name]-[hash].js`;
        }
      }
    }
  },
}));
