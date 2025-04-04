
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';

const CardSearchPagination: React.FC = () => {
  return (
    <div className="flex justify-center">
      <button className="px-4 py-2 bg-blue-600 rounded text-white">
        <TranslatedText keyName="pagination.loadMore" fallback="Load More" />
      </button>
    </div>
  );
};

export default CardSearchPagination;
