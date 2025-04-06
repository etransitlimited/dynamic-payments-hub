
import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./components/routing/RouteComponents";
import { Suspense } from "react";
import { PageLoading } from "./components/routing/LoadingComponents";
import { DefaultErrorBoundary } from "./components/ErrorBoundary";
import AppProviders from "./components/providers/AppProviders";

function App() {
  return (
    <div className="App">
      <DefaultErrorBoundary>
        <AppProviders>
          <BrowserRouter>
            <Suspense fallback={<PageLoading />}>
              <RouteComponents />
            </Suspense>
          </BrowserRouter>
        </AppProviders>
      </DefaultErrorBoundary>
    </div>
  );
}

export default App;
