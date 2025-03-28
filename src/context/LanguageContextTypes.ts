
import { LanguageCode } from '@/utils/languageUtils';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}
