
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Page loading component
const PageLoading = () => (
  <div className="min-h-screen bg-[#061428] p-4">
    <Skeleton className="w-full h-20 bg-blue-900/10 rounded-lg mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="w-full h-60 bg-blue-900/10 rounded-lg" />
      <Skeleton className="w-full h-60 bg-blue-900/10 rounded-lg" />
    </div>
  </div>
);

// ScrollToTop component to reset scroll position on page changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// SEO Handler component
const SEOHandler = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Set the language attribute on the html element
    document.documentElement.lang = language;
    
    // Add hreflang links for language versions
    updateHreflangLinks(location.pathname, language);
  }, [location.pathname, language]);
  
  return null;
};

// Helper function to update hreflang links
const updateHreflangLinks = (pathname: string, currentLang: string) => {
  // Remove existing hreflang links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  
  // Add hreflang links for all supported languages
  const languages = ['en', 'zh-CN', 'zh-TW', 'fr', 'es'];
  const baseUrl = window.location.origin;
  
  languages.forEach(lang => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    link.setAttribute('href', `${baseUrl}${pathname}${lang === 'en' ? '' : `?lang=${lang}`}`);
    document.head.appendChild(link);
  });
  
  // Add x-default hreflang
  const defaultLink = document.createElement('link');
  defaultLink.setAttribute('rel', 'alternate');
  defaultLink.setAttribute('hreflang', 'x-default');
  defaultLink.setAttribute('href', `${baseUrl}${pathname}`);
  document.head.appendChild(defaultLink);
};

function App() {
  // Configure QueryClient with performance optimizations
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <SEOHandler />
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
