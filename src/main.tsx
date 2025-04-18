
import { createRoot } from 'react-dom/client';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import './index.css';

// Simple inline loading component for faster initial render
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#061428] text-white">
    <div className="flex flex-col items-center">
      <div className="w-64 h-12 bg-blue-900/20 rounded-lg mb-4 animate-pulse"></div>
      <div className="w-48 h-4 bg-blue-900/20 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

// Optimization: Preload critical assets as early as possible
const preloadAssets = () => {
  if (typeof window !== 'undefined') {
    // Immediately start loading the main CSS
    const linkPreload = document.createElement('link');
    linkPreload.rel = 'preload';
    linkPreload.href = '/src/index.css';
    linkPreload.as = 'style';
    document.head.appendChild(linkPreload);
    
    // Use a simpler approach to preload the App component
    setTimeout(() => {
      import('./App');
    }, 100);
    
    // When the page has loaded, prefetch additional resources
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Preload common components that will likely be used
        import('./pages/dashboard/DashboardHome');
        import('./components/dashboard/DashboardHeader');
      }, 1000);
    });
  }
};

// Start preloading assets immediately
preloadAssets();

// Import the App directly to avoid issues with dynamic imports
import App from './App';

// Root rendering with error boundaries and suspense
const rootElement = document.getElementById("root");

if (rootElement) {
  // Use createRoot to enable React 18 concurrent features
  createRoot(rootElement).render(
    <ErrorBoundary>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
}
