
import React from 'react';
import { ReactNode } from 'react';
import TranslatedText from '@/components/translation/TranslatedText';

interface CardSearchHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  titleKey?: string;
  subtitleKey?: string;
}

const CardSearchHeader: React.FC<CardSearchHeaderProps> = ({ 
  title, 
  subtitle, 
  titleKey = "cards.search.title",
  subtitleKey = "cards.search.searchCriteria" 
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white">
        {title || <TranslatedText keyName={titleKey} fallback="Card Search" />}
      </h1>
      <p className="text-gray-400">
        {subtitle || <TranslatedText keyName={subtitleKey} fallback="Search Criteria" />}
      </p>
    </div>
  );
};

export default CardSearchHeader;
