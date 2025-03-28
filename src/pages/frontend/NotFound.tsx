
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-950 to-indigo-900 text-white p-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      </div>
      
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          404
        </h1>
        <h2 className="text-3xl font-bold">{t('notFound.title')}</h2>
        <p className="text-xl text-blue-200">
          {t('notFound.description')}
        </p>
        <div className="pt-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8">
            <Link to="/">{t('notFound.backHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
