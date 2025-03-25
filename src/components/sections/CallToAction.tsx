
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const CallToAction = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto py-16 px-4 relative z-10 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-900/80 backdrop-blur-md z-0"></div>
        
        <div className="p-12 text-center max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">{t("cta.title")}</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
          >
            {t("cta.button")}
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
