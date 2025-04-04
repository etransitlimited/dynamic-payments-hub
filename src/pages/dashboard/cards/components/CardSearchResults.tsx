
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';
import { useLanguage } from '@/context/LanguageContext';

const CardSearchResults: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-charcoal-light rounded-lg p-6" data-language={language}>
      <h2 className="text-xl font-semibold text-white mb-4">
        <TranslatedText keyName="cards.search.cardSearchResults" fallback="Card Search Results" />
      </h2>
      <div className="mt-4">
        <p className="text-gray-400">
          <TranslatedText keyName="cards.search.noResults" fallback="No cards found matching your criteria." />
        </p>
      </div>
    </div>
  );
};

export default CardSearchResults;
