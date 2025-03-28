
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface FrontendProvidersProps {
  children: ReactNode;
}

const FrontendProviders = ({ children }: FrontendProvidersProps) => {
  // Create a client for frontend-specific queries
  const frontendQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 15 * 60 * 1000,    // 15 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={frontendQueryClient}>
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default FrontendProviders;
