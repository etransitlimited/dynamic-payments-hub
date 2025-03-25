
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  ShoppingCart, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Globe,
  Wallet,
  Lock,
  Settings
} from "lucide-react";

const featuresIcons = [
  <CreditCard className="w-8 h-8" />,
  <ShoppingCart className="w-8 h-8" />,
  <BarChart3 className="w-8 h-8" />,
  <ShieldCheck className="w-8 h-8" />,
  <Zap className="w-8 h-8" />,
  <Globe className="w-8 h-8" />,
  <Wallet className="w-8 h-8" />,
  <Lock className="w-8 h-8" />,
  <Settings className="w-8 h-8" />
];

const Features = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto py-20 px-4 relative z-10">
      <div className="absolute inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=2071&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}
      ></div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center font-display text-cyan-400 bg-clip-text relative z-10"
      >
        {t("features.title")}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 } 
            }}
            className="h-full" // Ensure the motion div takes full height
          >
            <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 h-full flex flex-col">
              <div className="mb-4 text-cyan-300">
                {featuresIcons[index - 1]}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t(`features.${index}.title`)}
              </h3>
              <p className="text-blue-100 flex-grow">
                {t(`features.${index}.description`)}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
