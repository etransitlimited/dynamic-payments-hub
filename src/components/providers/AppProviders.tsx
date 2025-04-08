
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/context/LanguageContext';
import TranslationProvider from '@/context/TranslationProvider';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <TranslationProvider>
          <Toaster />
          <SonnerToaster />
          {children}
        </TranslationProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default AppProviders;
