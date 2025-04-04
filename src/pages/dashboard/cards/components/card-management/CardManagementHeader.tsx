
import React from 'react';
import TranslatedText from '@/components/translation/TranslatedText';

interface CardManagementHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

const CardManagementHeader: React.FC<CardManagementHeaderProps> = ({ 
  title, 
  subtitle
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white">
        {title || <TranslatedText keyName="cards.management.title" fallback="Card Management" />}
      </h1>
      <p className="text-gray-400">
        {subtitle || <TranslatedText keyName="cards.management.subtitle" fallback="Manage your cards and applications" />}
      </p>
    </div>
  );
};

export default CardManagementHeader;
