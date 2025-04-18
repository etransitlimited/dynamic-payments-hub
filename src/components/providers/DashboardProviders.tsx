
import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccountProvider } from "@/context/AccountContext";

interface DashboardProvidersProps {
  children: ReactNode;
}

const DashboardProviders = ({ children }: DashboardProvidersProps) => {
  // Create a memoized query client to prevent unnecessary re-renders
  const dashboardQueryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true, // Dashboard data should be updated when window is focused
        retry: 2,
        staleTime: 2 * 60 * 1000, // 2 minutes - more frequent updates for dashboard data
        gcTime: 5 * 60 * 1000,    // 5 minutes
      },
    },
  }), []);

  return (
    <QueryClientProvider client={dashboardQueryClient}>
      <ErrorBoundary>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          {children}
        </LanguageProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default DashboardProviders;
