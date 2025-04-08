
import React, { ReactNode, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface PageLayoutProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  headerContent?: ReactNode;
  animationKey?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

/**
 * Enhanced PageLayout component
 * Provides consistent layout for dashboard pages with breadcrumb support and smooth transitions
 */
const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  actions,
  headerContent,
  breadcrumbs,
  animationKey = 'default-page'
}) => {
  // Use this state to prevent layout shifts during animations
  const [hasRendered, setHasRendered] = useState(false);

  // Set hasRendered to true after the first render to ensure smooth transitions
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setHasRendered(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { 
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05 
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.15,
        when: "afterChildren",
        staggerChildren: 0.03
      } 
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="space-y-4"
      >
        {/* Breadcrumb navigation */}
        {breadcrumbs && breadcrumbs.length > 1 && (
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={`breadcrumb-${index}`}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink href={crumb.href} className="text-purple-300 hover:text-purple-200">
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-white font-medium">{crumb.label}</span>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="text-purple-500" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
        
        {(title || subtitle || actions) && (
          <motion.header 
            variants={childVariants}
            className="flex flex-col md:flex-row md:items-center justify-between mb-4"
          >
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-white">
                  {title}
                </h1>
              )}
              
              {subtitle && (
                <p className="text-sm text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            
            {actions && (
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {actions}
              </div>
            )}
          </motion.header>
        )}

        {headerContent && (
          <motion.div 
            variants={childVariants}
            className="mb-2"
          >
            {headerContent}
          </motion.div>
        )}
        
        {hasRendered && (
          <motion.div 
            variants={childVariants}
            className="space-y-4"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLayout;
