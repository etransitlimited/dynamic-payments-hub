
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
  // Improved build configuration with simplified chunking strategy
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
    // Simpler chunking strategy to avoid dynamic import issues
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-dialog', '@radix-ui/react-toast'],
          'animation-vendor': ['framer-motion'],
          'chart-vendor': ['recharts'],
          'form-vendor': ['react-hook-form', 'zod']
        },
        // More reliable chunk naming with fewer hashes
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
}));
