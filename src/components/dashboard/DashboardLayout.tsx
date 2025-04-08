
import React, { useEffect, useRef } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/context/LanguageContext";
import HreflangTags from "@/components/seo/HreflangTags";
import { useLanguage } from "@/context/LanguageContext";
import TranslationWrapper from "@/components/translation/TranslationWrapper";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

// Inner component to handle language-specific rendering
const DashboardContent = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const locationPathRef = useRef(location.pathname);
  const languageRef = useRef(language);
  const contentRef = useRef<HTMLDivElement>(null);
  const layoutKey = useRef(`dashboard-layout-${Math.random().toString(36).substring(2, 9)}`);
  
  // Redirect to dashboard if accessing the root path
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    } else if (location.pathname === '/dashboard/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);
  
  // Use direct DOM update instead of state/context for language attribute
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language;
      // Update data-language attribute directly
      if (contentRef.current) {
        contentRef.current.setAttribute('data-language', language);
      }
    }
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage;
        
        // Update DOM attributes directly without re-rendering
        if (contentRef.current) {
          contentRef.current.setAttribute('data-language', newLanguage);
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Use a stable memo for Outlet/children to avoid re-renders
  const contentElement = React.useMemo(() => {
    return children || <Outlet />;
  }, [children]);

  return (
    <div 
      className="min-h-screen flex w-full bg-charcoal overflow-visible relative" 
      ref={contentRef}
      data-language={languageRef.current}
    >
      {/* Enhanced Background Layers with modern design */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Charcoal base */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Enhanced gradient orbs with subtle animation */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/5 rounded-full blur-3xl opacity-50"></div>
        
        {/* Additional accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
      
      {/* Main Layout */}
      <div className="relative z-10 flex w-full h-screen overflow-visible">
        <AdminSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-auto">
          <DashboardHeader className="flex-shrink-0" />
          <main className="flex-1 overflow-auto p-6">
            <ErrorBoundary>
              <TranslationWrapper>
                {contentElement}
              </TranslationWrapper>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <LanguageProvider>
      <SidebarProvider defaultState="expanded">
        <DashboardContent {...props} />
        <HreflangTags />
      </SidebarProvider>
    </LanguageProvider>
  );
};

export default React.memo(DashboardLayout);
