
import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import TranslationProvider from '@/context/TranslationProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </LanguageProvider>
  );
};

export default AppProviders;
