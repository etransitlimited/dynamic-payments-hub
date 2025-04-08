
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLanguage } from "@/context/LanguageContext";

interface PageLayoutProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  headerContent?: ReactNode;
  animationDelay?: number;
  className?: string;
  containerClassName?: string;
  animationKey?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  actions,
  headerContent,
  animationDelay = 0.05,
  className = "",
  containerClassName = "",
  animationKey,
}) => {
  const { language } = useLanguage();
  const key = animationKey || `page-layout-${language}`;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: animationDelay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <ErrorBoundary>
      <div className={cn("relative min-h-full", className)} key={key}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={cn("container mx-auto p-0 md:p-2 relative z-10", containerClassName)}
        >
          {headerContent ? (
            <motion.div variants={item} className="mb-6">
              {headerContent}
            </motion.div>
          ) : title || subtitle ? (
            <motion.div variants={item} className="mb-6 flex justify-between items-start">
              <div>
                {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
                {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
              </div>
              {actions && <div>{actions}</div>}
            </motion.div>
          ) : null}

          {children}
        </motion.div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(PageLayout);
