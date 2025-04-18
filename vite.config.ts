
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
    react(),
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
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    } : undefined,
    // Generate sourcemaps for production debugging
    sourcemap: mode === 'development',
    // Improved chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            } else if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            } else if (id.includes('framer-motion') || id.includes('tsparticles')) {
              return 'animation-vendor';
            } else if (id.includes('recharts') || id.includes('d3-')) {
              return 'chart-vendor';
            } else if (id.includes('react-hook-form') || id.includes('zod') || id.includes('hookform')) {
              return 'form-vendor';
            } else if (id.includes('date-fns') || id.includes('clsx') || id.includes('sonner')) {
              return 'utils';
            }
          }
          return undefined;
        },
        // Optimize chunk size and loading
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
}));
