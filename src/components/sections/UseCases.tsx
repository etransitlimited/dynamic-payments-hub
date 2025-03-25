
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ShoppingCart, 
  Globe, 
  ChartBar, 
  Plane, 
  Layers, 
  DollarSign,
  Calendar,
  User,
  Gamepad,
  MoreHorizontal
} from 'lucide-react';

const UseCases = () => {
  const { t } = useLanguage();

  const useCaseItems = [
    { icon: <ShoppingCart size={24} />, key: 'ecommerce' },
    { icon: <Globe size={24} />, key: 'crossBorderShopping' },
    { icon: <ChartBar size={24} />, key: 'testingAndReviews' },
    { icon: <Plane size={24} />, key: 'travelBooking' },
    { icon: <Layers size={24} />, key: 'adCampaigns' },
    { icon: <DollarSign size={24} />, key: 'developerFees' },
    { icon: <Calendar size={24} />, key: 'subscriptions' },
    { icon: <User size={24} />, key: 'accountVerification' },
    { icon: <Gamepad size={24} />, key: 'gameTopUp' },
    { icon: <MoreHorizontal size={24} />, key: 'other' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0c1e35] to-[#0A1A2F] relative overflow-hidden">
      {/* Removed the background image SVG pattern here and replaced with a solid color overlay */}
      <div className="absolute inset-0 bg-[#071428] opacity-95 z-0"></div>
      
      <div className="container mx-auto max-w-6xl z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-display">
            {t('useCases.title')}
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            {t('useCases.subtitle')}
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCaseItems.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-[#112338]/80 backdrop-blur-sm border border-blue-900/30 rounded-xl p-5 flex flex-col items-center text-center hover:border-cyan-500/50 hover:bg-[#15294a]/80 transition-all duration-300 cursor-pointer"
              variants={item}
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-full mb-4">
                <div className="text-blue-950">
                  {useCase.icon}
                </div>
              </div>
              <h3 className="text-blue-100 font-medium">
                {t(`useCases.${useCase.key}`)}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
