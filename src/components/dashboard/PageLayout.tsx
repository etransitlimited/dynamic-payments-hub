
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
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
 * Provides consistent layout for dashboard pages with breadcrumb support
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
  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-4">
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
        </header>
      )}

      {headerContent && (
        <div className="mb-2">
          {headerContent}
        </div>
      )}
      
      {children}
    </motion.div>
  );
};

export default PageLayout;
