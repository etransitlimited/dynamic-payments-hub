
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';
import { useLanguage } from '@/context/LanguageContext';

const CardSearchPagination: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex justify-center mt-6">
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded text-white">
        <TranslatedText keyName="pagination.loadMore" fallback="Load More" />
      </button>
    </div>
  );
};

export default CardSearchPagination;
