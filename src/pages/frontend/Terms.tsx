
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  const { t } = useSafeTranslation();

  return (
    <>
      <Helmet>
        <title>{t('terms.pageTitle', 'Terms of Service')}</title>
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">{t('terms.title', 'Terms of Service')}</h1>
        
        <div className="prose max-w-3xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.introduction.title', '1. Introduction')}</h2>
            <p>{t('terms.introduction.content', 'These Terms of Service govern your use of our website and services.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.usage.title', '2. Usage Policy')}</h2>
            <p>{t('terms.usage.content', 'By accessing our services, you agree to comply with these terms and all applicable laws and regulations.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.privacy.title', '3. Privacy Policy')}</h2>
            <p>{t('terms.privacy.content', 'Our privacy policy explains how we collect, use, and protect your personal information.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.liability.title', '4. Limitation of Liability')}</h2>
            <p>{t('terms.liability.content', 'We are not liable for any damages that may occur from the use of our services.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('terms.changes.title', '5. Changes to Terms')}</h2>
            <p>{t('terms.changes.content', 'We reserve the right to modify these terms at any time. Please review them regularly.')}</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms;
