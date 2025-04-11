
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFundDetailsTranslation } from '../i18n';
import { useLanguage } from '@/context/LanguageContext';

// 使用标准模块隔离接口
interface wallet_viewall_IsolatedComponent {
  locale: string;
  version: "v1"|"v2";
}

const ViewAllLink: React.FC = () => {
  const { language } = useLanguage();
  
  // 函数获取直接翻译
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, language);
  };
  
  return (
    <Link 
      to="/dashboard/wallet/fund-details/all"
      className="wallet_viewall_link_3f8e inline-flex items-center justify-center w-full px-4 py-3 mt-2 transition-all duration-300 bg-gradient-to-r from-purple-900/30 to-blue-900/30 hover:from-purple-700/50 hover:to-blue-700/50 rounded-lg text-purple-200 hover:text-white border border-purple-900/50 hover:border-purple-700/70"
      data-language={language}
      data-isolation-scope="wallet"
    >
      <span>{getTranslation('viewAllRecords')}</span>
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
};

export default ViewAllLink;
