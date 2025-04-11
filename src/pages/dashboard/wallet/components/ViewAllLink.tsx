
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFundDetailsTranslation } from '../i18n';
import { useLanguage } from '@/context/LanguageContext';

const ViewAllLink: React.FC = () => {
  const { language } = useLanguage();
  
  // Function to get direct translations
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, language);
  };
  
  return (
    <Link 
      to="/dashboard/wallet/fund-details/all"
      className="inline-flex items-center justify-center w-full px-4 py-3 mt-2 transition-all duration-300 bg-gradient-to-r from-purple-900/30 to-blue-900/30 hover:from-purple-700/50 hover:to-blue-700/50 rounded-lg text-purple-200 hover:text-white border border-purple-900/50 hover:border-purple-700/70"
      data-language={language}
    >
      <span>{getTranslation('viewAllRecords')}</span>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
};

export default ViewAllLink;
