
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/context/LanguageContext';
import TranslationProvider from '@/context/TranslationProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default AppProviders;
