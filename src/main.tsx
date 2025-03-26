
import { createRoot } from 'react-dom/client';
import { Suspense, lazy, StrictMode } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';
import './index.css';

// Lazy load the main App for better initial loading
const App = lazy(() => import('./App'));

// Application loading fallback
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#061428] text-white">
    <div className="flex flex-col items-center">
      <Skeleton className="w-64 h-12 bg-blue-900/20 rounded-lg mb-4" />
      <Skeleton className="w-48 h-4 bg-blue-900/20 rounded-lg" />
    </div>
  </div>
);

// Root rendering with error boundaries and suspense
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
