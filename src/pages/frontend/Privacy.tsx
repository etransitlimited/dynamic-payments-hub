
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  const { t } = useSafeTranslation();

  return (
    <>
      <Helmet>
        <title>{t('privacy.pageTitle', 'Privacy Policy')}</title>
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">{t('privacy.title', 'Privacy Policy')}</h1>
        
        <div className="prose max-w-3xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.collection.title', '1. Information Collection')}</h2>
            <p>{t('privacy.collection.content', 'We collect information that you provide directly to us when you use our services.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.use.title', '2. Use of Information')}</h2>
            <p>{t('privacy.use.content', 'We use the information we collect to provide, maintain, and improve our services.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.sharing.title', '3. Information Sharing')}</h2>
            <p>{t('privacy.sharing.content', 'We do not share your personal information with third parties except as described in this policy.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.security.title', '4. Data Security')}</h2>
            <p>{t('privacy.security.content', 'We implement security measures to protect your information from unauthorized access or disclosure.')}</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title', '5. Cookies')}</h2>
            <p>{t('privacy.cookies.content', 'We use cookies and similar technologies to enhance your experience on our platform.')}</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Privacy;
