
import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./components/routing/RouteComponents";
import { Suspense } from "react";
import { PageLoading } from "./components/routing/LoadingComponents";
import { DefaultErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <DefaultErrorBoundary>
        <BrowserRouter>
          <Suspense fallback={<PageLoading />}>
            <RouteComponents />
          </Suspense>
        </BrowserRouter>
      </DefaultErrorBoundary>
    </div>
  );
}

export default App;
