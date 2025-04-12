
import React from 'react';
import { useTranslation } from '@/context/TranslationProvider';
import { translationToString } from '@/utils/translationString';

interface TranslationWrapperProps {
  children: React.ReactNode;
}

const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  const { isChangingLanguage } = useTranslation();
  
  // 如果语言正在切换，我们显示一个稍微透明的过渡状态
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
