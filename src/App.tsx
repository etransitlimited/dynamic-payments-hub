
import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./components/routing/RouteComponents";
import { Suspense } from "react";
import { PageLoading } from "./components/routing/LoadingComponents";
import { DefaultErrorBoundary } from "./components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import AppProviders from "./components/providers/AppProviders";

function App() {
  return (
    <div className="App">
      <DefaultErrorBoundary>
        <AppProviders>
          <HelmetProvider>
            <BrowserRouter>
              <Suspense fallback={<PageLoading />}>
                <RouteComponents />
              </Suspense>
            </BrowserRouter>
          </HelmetProvider>
        </AppProviders>
      </DefaultErrorBoundary>
    </div>
  );
}

export default App;
