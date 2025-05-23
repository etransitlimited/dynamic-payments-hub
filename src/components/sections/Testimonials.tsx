import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Testimonials = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section className="container mx-auto py-8 sm:py-12 md:py-16 px-4 relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center font-display text-cyan-400 bg-clip-text relative z-10"
      >
        {t("supportedPayments.title")}
      </motion.h2>
      <div className="grid grid-cols-3 gap-2 xs:gap-3 md:gap-8">
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
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-2 xs:p-3 md:p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 flex flex-col items-center justify-center h-18 xs:h-22 sm:h-24 md:h-40">
            <div className="w-10 xs:w-12 sm:w-14 md:w-32 h-8 xs:h-9 sm:h-10 md:h-20 flex items-center justify-center bg-white rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 324" className="w-8 xs:w-9 sm:w-10 md:w-24 h-6 xs:h-7 sm:h-8 md:h-16">
                <path d="M651.18,1.47h-88.25c-27.21,0-47.52,7.38-59.76,34.47l-168.5,386.76h119.19s19.5-51.24,23.84-62.42c13.03,0,128.73,0.18,145.23,0.18,3.39,14.44,13.77,62.24,13.77,62.24h105.32l-90.83-421.23Zm-144.64,282.3c9.4-24.12,45.26-116.63,45.26-116.63,-0.67,1.1,9.32-24.12,15.07-39.74l7.69,35.98c0,0,21.69,99.49,26.25,120.4h-94.27Z" fill="#1434CB"/>
                <path d="M243.63,422.7l111.25-261.02-17-82.1c-0,0-5.25-2.75-16-5.25-10.75-2.5-39.58-8.24-68.75-8.59-49.46-0.59-166.5,0-166.5,0l-0.38,1.32c0,0,81.04,16.84,158.08,41.94,33.49,43.34,113.92,313.7,113.92,313.7h-114.62Z" fill="#1434CB"/>
              </svg>
            </div>
            <p className="text-cyan-400 font-semibold mt-1 xs:mt-1.5 sm:mt-2 md:mt-4 text-xs xs:text-sm md:text-lg">Visa</p>
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
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-2 xs:p-3 md:p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 flex flex-col items-center justify-center h-18 xs:h-22 sm:h-24 md:h-40">
            <div className="w-10 xs:w-12 sm:w-14 md:w-32 h-8 xs:h-9 sm:h-10 md:h-20 flex items-center justify-center bg-white rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.39 86.9" className="w-8 xs:w-9 sm:w-10 md:w-24 h-6 xs:h-7 sm:h-8 md:h-16">
                <path d="M48.37 15.14h34.66v56.61H48.37z" fill="#ff5f00"/>
                <path d="M51.94 43.45a35.94 35.94 0 0113.75-28.3 36 36 0 100 56.61 35.94 35.94 0 01-13.75-28.31z" fill="#eb001b"/>
                <path d="M120.5 65.76V64.6h.5v-.24h-1.19v.24h.47v1.16zm2.31 0v-1.4h-.36l-.42 1-.42-1h-.36v1.4h.26V64.7l.39.91h.27l.39-.91v1.06z" fill="#f79e1b"/>
                <path d="M123.94 43.45a36 36 0 01-58.25 28.3 36 36 0 000-56.61 36 36 0 0158.25 28.3z" fill="#f79e1b"/>
              </svg>
            </div>
            <p className="text-cyan-400 font-semibold mt-1 xs:mt-1.5 sm:mt-2 md:mt-4 text-xs xs:text-sm md:text-lg">Mastercard</p>
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
          <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 p-2 xs:p-3 md:p-6 rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 flex flex-col items-center justify-center h-18 xs:h-22 sm:h-24 md:h-40">
            <div className="w-10 xs:w-12 sm:w-14 md:w-32 h-8 xs:h-9 sm:h-10 md:h-20 flex items-center justify-center bg-white rounded-md">
              <CreditCard className="w-6 xs:w-7 sm:w-8 md:w-16 h-4 xs:h-5 sm:h-6 md:h-12 text-[#0F2643]" />
            </div>
            <p className="text-cyan-400 font-semibold mt-1 xs:mt-1.5 sm:mt-2 md:mt-4 text-xs xs:text-sm md:text-lg">{t("supportedPayments.other")}</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
