import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformance } from '@/hooks/use-performance';
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

const UseCaseItem = memo(({ icon, label, index, performanceTier }: { 
  icon: React.ReactNode, 
  label: string,
  index: number,
  performanceTier: string
}) => {
  const getAnimationProps = () => {
    if (performanceTier === 'low') {
      return {
        initial: undefined,
        whileHover: undefined,
        transition: undefined
      };
    }
    
    return {
      initial: { y: 10, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      whileHover: { 
        scale: 1.03,
        borderColor: 'rgba(6, 182, 212, 0.5)',
        backgroundColor: 'rgba(21, 41, 74, 0.9)'
      },
      transition: { 
        duration: 0.2,
        delay: performanceTier === 'high' ? index * 0.1 : Math.min(index * 0.05, 0.2)
      }
    };
  };
  
  return (
    <motion.div
      className="bg-[#112338]/80 backdrop-blur-sm border border-blue-900/30 rounded-xl p-5 flex flex-col items-center text-center hover:border-cyan-500/50 transition-all duration-300 cursor-pointer h-full"
      {...getAnimationProps()}
    >
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-full mb-4">
        <div className="text-blue-950">
          {icon}
        </div>
      </div>
      <h3 className="text-blue-100 font-medium line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
        {label}
      </h3>
    </motion.div>
  );
});

UseCaseItem.displayName = 'UseCaseItem';

const UseCases = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();

  const useCaseItems = [
    { icon: <ShoppingCart size={22} />, key: 'ecommerce' },
    { icon: <Globe size={22} />, key: 'crossBorderShopping' },
    { icon: <ChartBar size={22} />, key: 'testingAndReviews' },
    { icon: <Plane size={22} />, key: 'travelBooking' },
    { icon: <Layers size={22} />, key: 'adCampaigns' },
    { icon: <DollarSign size={22} />, key: 'developerFees' },
    { icon: <Calendar size={22} />, key: 'subscriptions' },
    { icon: <User size={22} />, key: 'accountVerification' },
    { icon: <Gamepad size={22} />, key: 'gameTopUp' },
    { icon: <MoreHorizontal size={22} />, key: 'other' }
  ];

  const useAnimation = performanceTier !== 'low';
  
  const visibleUseCases = {
    high: useCaseItems.length,
    medium: useCaseItems.length,
    low: isMobile ? 6 : 8
  }[performanceTier];

  const gridClasses = {
    high: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    medium: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    low: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
  }[performanceTier];

  return (
    <section id="use-cases" className="py-10 sm:py-16 md:py-20 px-4 relative overflow-hidden bg-[#071428]">
      <div className="absolute inset-0 bg-[#071428] opacity-95 z-0"></div>
      
      <div className="container mx-auto max-w-6xl z-10 relative">
        {useAnimation ? (
          <>
            <motion.div 
              className="text-center mb-6 sm:mb-10 md:mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-display">
                {t('useCases.title')}
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                {t('useCases.subtitle')}
              </p>
            </motion.div>
            
            <motion.div 
              className={`grid ${gridClasses} gap-3 sm:gap-4 md:gap-6 auto-rows-fr`}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { 
                  transition: { 
                    staggerChildren: performanceTier === 'high' ? 0.1 : 0.05
                  }
                },
                hidden: {}
              }}
            >
              {useCaseItems.slice(0, visibleUseCases).map((useCase, index) => (
                <motion.div
                  key={useCase.key}
                  className="h-full"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1
                      }
                    }
                  }}
                >
                  <UseCaseItem
                    icon={useCase.icon}
                    label={t(`useCases.${useCase.key}`)}
                    index={index}
                    performanceTier={performanceTier}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <>
            <div className="text-center mb-6 sm:mb-10 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-display">
                {t('useCases.title')}
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                {t('useCases.subtitle')}
              </p>
            </div>
            
            <div className={`grid ${gridClasses} gap-3 sm:gap-4 md:gap-6 auto-rows-fr`}>
              {useCaseItems.slice(0, visibleUseCases).map((useCase, index) => (
                <div key={useCase.key} className="h-full">
                  <UseCaseItem
                    icon={useCase.icon}
                    label={t(`useCases.${useCase.key}`)}
                    index={index}
                    performanceTier={performanceTier}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default React.memo(UseCases);
