
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto pt-16 pb-28 px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            {t("hero.subtitle")}
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
          >
            {t("hero.button")}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop" 
              alt="Global payment visualization" 
              className="rounded-xl w-full object-cover object-center shadow-xl border border-blue-500/20 relative z-10"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
