
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';

interface CardSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const CardSearchFilters: React.FC<CardSearchFiltersProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-charcoal-light rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">
          <TranslatedText keyName="cards.search.enterCardInfo" fallback="Enter card number or cardholder information to search" />
        </h3>
      </div>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search cards..."
        className="w-full p-2 rounded bg-charcoal border border-gray-700 text-white"
      />
    </div>
  );
};

export default CardSearchFilters;
