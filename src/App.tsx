
import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./components/routing/RouteComponents";
import { Suspense, lazy } from "react";
import { PageLoading } from "./components/routing/LoadingComponents";
import { DefaultErrorBoundary } from "./components/ErrorBoundary";
import AppProviders from "./components/providers/AppProviders";

// Import the AuthDebugger component
const AuthDebugger = lazy(() => import("./modules/system/components/AuthDebugger"));

function App() {
  return (
    <div className="App min-h-screen">
      <DefaultErrorBoundary>
        <AppProviders>
          <BrowserRouter>
            <Suspense fallback={<PageLoading />}>
              {/* Add the auth debugger in development */}
              {process.env.NODE_ENV !== 'production' && <AuthDebugger />}
              <RouteComponents />
            </Suspense>
          </BrowserRouter>
        </AppProviders>
      </DefaultErrorBoundary>
    </div>
  );
}

export default App;
