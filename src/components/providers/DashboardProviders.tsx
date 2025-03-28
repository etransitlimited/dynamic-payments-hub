
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface DashboardProvidersProps {
  children: ReactNode;
}

const DashboardProviders = ({ children }: DashboardProvidersProps) => {
  // Create a client for dashboard-specific queries with different settings
  const dashboardQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true, // Dashboard data should be updated when window is focused
        retry: 2,
        staleTime: 2 * 60 * 1000, // 2 minutes - more frequent updates for dashboard data
        gcTime: 5 * 60 * 1000,    // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={dashboardQueryClient}>
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

export default DashboardProviders;
