
import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./components/routing/RouteComponents";
import { Suspense, useEffect } from "react";
import { PageLoading } from "./components/routing/LoadingComponents";
import { DefaultErrorBoundary } from "./components/ErrorBoundary";
import AppProviders from "./components/providers/AppProviders";
import { authProtectionService } from "./services/authProtectionService";
import "./styles/transitions.css"; // 导入过渡样式

function App() {
  // 初始化认证保护服务
  useEffect(() => {
    authProtectionService.initialize();
  }, []);
  
  return (
    <div className="App min-h-screen">
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
