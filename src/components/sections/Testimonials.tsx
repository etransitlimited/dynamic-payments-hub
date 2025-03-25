
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto py-20 px-4 relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center font-display text-cyan-400 bg-clip-text relative z-10"
      >
        {t("supportedPayments.title")}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Visa Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 } 
          }}
        >
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 flex flex-col items-center justify-center h-40">
            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-24 h-16">
                <path fill="#1434CB" d="M0 0h640v480H0z"/>
                <path fill="#ffffff" d="M274.1 96c-40.4 0-76.6 16.2-103.5 42.3l103.5 88.6z"/>
                <path fill="#FFD500" d="M170.6 138.3c-27.4 27.4-44.4 65.3-44.4 106.9 0 41.6 17 79.5 44.4 106.9l103.5-106.9z"/>
                <path fill="#FF5E00" d="M170.6 351.7c27.4 27.4 65.2 44.3 106.8 44.3 41.6 0 79.5-17 106.9-44.3l-106.9-88.6z"/>
                <path fill="#1434CB" d="M377.2 96v206.9h103.5C480.7 202.5 434.8 96 377.2 96z"/>
              </svg>
            </div>
            <p className="text-cyan-400 font-semibold mt-4 text-lg">Visa</p>
          </Card>
        </motion.div>

        {/* Mastercard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 } 
          }}
        >
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 flex flex-col items-center justify-center h-40">
            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.39 86.9" className="w-24 h-16">
                <path d="M48.37 15.14h34.66v56.61H48.37z" fill="#ff5f00"/>
                <path d="M51.94 43.45a35.94 35.94 0 0113.75-28.3 36 36 0 100 56.61 35.94 35.94 0 01-13.75-28.31z" fill="#eb001b"/>
                <path d="M120.5 65.76V64.6h.5v-.24h-1.19v.24h.47v1.16zm2.31 0v-1.4h-.36l-.42 1-.42-1h-.36v1.4h.26V64.7l.39.91h.27l.39-.91v1.06z" fill="#f79e1b"/>
                <path d="M123.94 43.45a36 36 0 01-58.25 28.3 36 36 0 000-56.61 36 36 0 0158.25 28.3z" fill="#f79e1b"/>
              </svg>
            </div>
            <p className="text-cyan-400 font-semibold mt-4 text-lg">Mastercard</p>
          </Card>
        </motion.div>

        {/* Other Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.2 } 
          }}
        >
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 flex flex-col items-center justify-center h-40">
            <div className="w-32 h-20 flex items-center justify-center bg-white rounded-md">
              <CreditCard className="w-16 h-12 text-[#0F2643]" />
            </div>
            <p className="text-cyan-400 font-semibold mt-4 text-lg">{t("supportedPayments.other")}</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

