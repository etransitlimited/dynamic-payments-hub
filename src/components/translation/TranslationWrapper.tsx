
import React from 'react';
import { useTranslation } from '@/context/TranslationProvider';

interface TranslationWrapperProps {
  children: React.ReactNode;
}

const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  const { isChangingLanguage } = useTranslation();
  
  // If language is changing, we could show a loading state
  if (isChangingLanguage) {
    return (
      <div className="opacity-80 transition-opacity duration-300">
        {children}
      </div>
    );
  }
  
  return <>{children}</>;
};

export default TranslationWrapper;
