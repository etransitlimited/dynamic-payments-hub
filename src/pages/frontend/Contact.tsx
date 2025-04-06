
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { t } = useSafeTranslation();

  return (
    <>
      <Helmet>
        <title>{t('contact.pageTitle', 'Contact Us')}</title>
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">{t('contact.title', 'Contact Us')}</h1>
        <div className="max-w-2xl mx-auto">
          <p className="mb-6">
            {t('contact.description', 'Please fill out the form below to get in touch with us.')}
          </p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                {t('contact.nameLabel', 'Name')}
              </label>
              <input 
                type="text" 
                id="name" 
                className="w-full p-3 border rounded-md"
                placeholder={t('contact.namePlaceholder', 'Your name')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                {t('contact.emailLabel', 'Email')}
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 border rounded-md"
                placeholder={t('contact.emailPlaceholder', 'Your email address')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                {t('contact.messageLabel', 'Message')}
              </label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full p-3 border rounded-md"
                placeholder={t('contact.messagePlaceholder', 'Your message')}
              />
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              {t('contact.submitButton', 'Send Message')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
