
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import VirtualCardsStack from "@/components/cards/VirtualCardsStack";

const CallToAction = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="container mx-auto py-12 md:py-16 px-4 relative z-10 mb-12 md:mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 backdrop-blur-md z-0"></div>
        
        <div className="p-6 sm:p-8 md:p-12 lg:p-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-display">{t("cta.title")}</h2>
              <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-blue-100 max-w-lg mx-auto md:mx-0">{t("cta.subtitle")}</p>
              <Button 
                className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-lg hover:opacity-90 transition-all"
              >
                {t("cta.button")}
              </Button>
            </div>
            
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md">
                <VirtualCardsStack />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
