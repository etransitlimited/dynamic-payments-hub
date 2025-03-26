
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { lazy, Suspense, memo } from "react";
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

// Memoize the feature icon components for better performance
const FeatureIcon = memo(({ index }: { index: number }) => {
  const featuresIcons = [
    <CreditCard className="w-7 h-7" key="credit" />,
    <ShoppingCart className="w-7 h-7" key="cart" />,
    <BarChart3 className="w-7 h-7" key="chart" />,
    <ShieldCheck className="w-7 h-7" key="shield" />,
    <Zap className="w-7 h-7" key="zap" />,
    <Globe className="w-7 h-7" key="globe" />,
    <Wallet className="w-7 h-7" key="wallet" />,
    <Lock className="w-7 h-7" key="lock" />,
    <Settings className="w-7 h-7" key="settings" />
  ];
  
  return (
    <div className="mb-4 text-cyan-300">
      {featuresIcons[index]}
    </div>
  );
});

FeatureIcon.displayName = 'FeatureIcon';

// Memoized feature card component
const FeatureCard = memo(({ index, title, description }: { 
  index: number, 
  title: string, 
  description: string 
}) => {
  const { performanceTier } = usePerformance();

  // Simplified animation for lower performance devices
  const animationProps = {
    high: {
      whileHover: { scale: 1.03, transition: { duration: 0.2 } },
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 }
    },
    medium: {
      whileHover: { scale: 1.02, transition: { duration: 0.2 } },
      initial: { opacity: 0, y: 10 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: Math.min(index * 0.05, 0.2) }
    },
    low: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.5 }
    }
  }[performanceTier];

  return (
    <motion.div
      key={index}
      {...animationProps}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card className="card-gradient p-6 rounded-xl h-full flex flex-col">
        <FeatureIcon index={index - 1} />
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-blue-100 flex-grow">
          {description}
        </p>
      </Card>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

const Features = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();

  // Determine how many features to render based on performance tier and viewport
  const featureCount = {
    high: 9,
    medium: isMobile ? 6 : 9,
    low: isMobile ? 3 : 6
  }[performanceTier];

  // Determine if we should use animation for the title
  const useTitleAnimation = performanceTier !== 'low';

  return (
    <section className="container-tight py-16 md:py-20 relative z-10">
      {useTitleAnimation ? (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-6 md:mb-12 text-center font-display text-cyan-400 bg-clip-text relative z-10"
        >
          {t("features.title")}
        </motion.h2>
      ) : (
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-12 text-center font-display text-cyan-400 bg-clip-text relative z-10">
          {t("features.title")}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {Array.from({ length: featureCount }).map((_, idx) => {
          const index = idx + 1;
          return (
            <FeatureCard 
              key={index}
              index={index}
              title={t(`features.${index}.title`)}
              description={t(`features.${index}.description`)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Features;
