
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import VirtualCardsStack from "@/components/cards/VirtualCardsStack";
import { Link } from "react-router-dom";  // Import Link

const CallToAction = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="container mx-auto py-8 sm:py-12 md:py-16 px-4 relative z-10 mb-8 sm:mb-12 md:mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 backdrop-blur-md z-0"></div>
        
        <div className="p-4 sm:p-6 md:p-10 lg:p-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 font-display">{t("cta.title")}</h2>
              <p className="text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 text-blue-100 max-w-lg mx-auto md:mx-0">{t("cta.subtitle")}</p>
              <Button 
                asChild  // Use asChild to render a Link instead of a button
                className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-base md:text-lg px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-lg hover:opacity-90 transition-all"
              >
                <Link to="/register">  {/* Direct to register page */}
                  {t("cta.button")}
                </Link>
              </Button>
            </div>
            
            <div className="flex justify-center items-center relative">
              <VirtualCardsStack />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
