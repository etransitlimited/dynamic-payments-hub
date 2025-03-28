
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import FrontendProviders from "./FrontendProviders";
import DashboardProviders from "./DashboardProviders";

interface AppProvidersProps {
  children: ReactNode;
}

// Conditional provider based on current route
const ConditionalProviders = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  if (isDashboard) {
    return <DashboardProviders>{children}</DashboardProviders>;
  }
  
  return <FrontendProviders>{children}</FrontendProviders>;
};

const AppProviders = ({ children }: AppProvidersProps) => {
  // Fallback query client for the app root
  const [rootQueryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={rootQueryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <TooltipProvider>
            <ConditionalProviders>
              {children}
            </ConditionalProviders>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
