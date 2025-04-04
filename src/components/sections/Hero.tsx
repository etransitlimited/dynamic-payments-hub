
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import VirtualCardsStack from "@/components/cards/VirtualCardsStack";

const Hero = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="container mx-auto pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-6 font-display">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-10 text-blue-100">
            {t("hero.subtitle")}
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg hover:opacity-90 transition-all"
          >
            {t("hero.button")}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center relative z-10"
        >
          <VirtualCardsStack />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
