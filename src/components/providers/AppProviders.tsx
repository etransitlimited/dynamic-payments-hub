
import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import RouteComponents from "@/components/routing/RouteComponents";
import { LanguageProvider } from "@/context/LanguageContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  // Create a memoized query client for the app root
  const rootQueryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  }), []);

  return (
    <QueryClientProvider client={rootQueryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <LanguageProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
