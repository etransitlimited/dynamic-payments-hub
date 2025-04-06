
import { ReactNode } from 'react';
import { LanguageCode } from '@/utils/languageUtils';

export interface LanguageContextType {
  language: LanguageCode;
  t: (key: string) => string;
  translations: Record<string, any>;
  setLanguage: (lang: LanguageCode) => void;
  lastUpdate: number;
}

export interface LanguageProviderProps {
  children: ReactNode;
}
