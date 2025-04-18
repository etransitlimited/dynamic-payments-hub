
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import App from './App'; // Direct import instead of lazy loading
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
