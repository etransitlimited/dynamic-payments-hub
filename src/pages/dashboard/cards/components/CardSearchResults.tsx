
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';

const CardSearchResults: React.FC = () => {
  return (
    <div className="bg-charcoal-light rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        <TranslatedText keyName="cards.search.cardSearchResults" fallback="Card Search Results" />
      </h2>
      <p className="text-gray-400">
        <TranslatedText keyName="cards.search.noResults" fallback="No cards found matching your criteria." />
      </p>
    </div>
  );
};

export default CardSearchResults;
