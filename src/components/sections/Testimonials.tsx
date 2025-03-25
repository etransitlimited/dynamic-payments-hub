
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
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80" className="w-24 h-16">
                <path 
                  d="M40.877 10.718c-4.82 0-9.235 1.935-12.365 5.065l12.365 10.574z" 
                  fill="#1434CB"
                />
                <path 
                  d="M28.512 15.783c-3.273 3.273-5.298 7.791-5.298 12.774 0 4.983 2.025 9.5 5.298 12.774l12.365-12.774z" 
                  fill="#1434CB"
                />
                <path 
                  d="M28.512 41.331c3.273 3.273 7.782 5.286 12.765 5.286 4.983 0 9.5-2.013 12.774-5.286l-12.774-10.574z" 
                  fill="#1434CB"
                />
                <path 
                  d="M53.642 10.718v24.665h12.365c0-9.863-4.982-24.665-12.365-24.665z" 
                  fill="#1434CB"
                />
                <path 
                  d="M84.5 20.5h8l-5 22h-8l5-22zm20 0c-1.5 4-3.5 9-5 13l-3 9h-8l13-22h3zm17 22l2-5h10l-2 5h-10zm3-9l2-5h10l-2 5h-10zm24-13h8l-5 22h-8l5-22zm20 0c-1.5 4-3.5 9-5 13l-3 9h-8l13-22h3zm17 22l2-5h10l-2 5h-10zm3-9l2-5h10l-2 5h-10z" 
                  fill="#1434CB"
                />
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
