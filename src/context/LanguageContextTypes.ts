
import { ReactNode } from 'react';
import { LanguageCode } from '@/utils/languageUtils';

export interface LanguageContextType {
  language: LanguageCode;
  t: (key: string) => string;
  translations: Record<string, any>;
  setLanguage: (lang: LanguageCode) => void;
  lastUpdate: number;
  isLoading: boolean; // Changed from optional to required
}

export interface LanguageProviderProps {
  children: ReactNode;
}
