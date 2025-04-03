
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import TranslatedText from '@/components/translation/TranslatedText';
import { useSafeTranslation } from '@/hooks/use-safe-translation';

interface InformationBoxProps {
  className?: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({ className = '' }) => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());

  // Monitor language changes and force rerendering
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`InformationBox language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
      setForceUpdateKey(Date.now());
    }
  }, [language, currentLanguage]);

  return (
    <div 
      className={`mt-6 bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 flex items-start ${className}`}
      key={`info-box-${currentLanguage}-${forceUpdateKey}`} // Ensure rerendering on language change
      data-language={currentLanguage}
    >
      <div className="bg-blue-900/40 p-1.5 rounded-md mr-3 text-blue-300">
        <Info size={16} />
      </div>
      <div className="text-sm text-blue-300/90">
        <TranslatedText 
          keyName="wallet.fundDetails.infoMessage" 
          fallback="The transaction data is updated in real-time. For detailed reports, use the Export feature to download a comprehensive statement."
          maxLines={3}
          truncate
          key={`info-message-${currentLanguage}-${forceUpdateKey}`}
        />
      </div>
    </div>
  );
};

export default InformationBox;
