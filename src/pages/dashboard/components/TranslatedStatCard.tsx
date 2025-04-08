
import React from 'react';
import StatCard from './StatCard';
import TranslatedText from '@/components/translation/TranslatedText';

interface TranslatedStatCardProps {
  titleKey: string;
  titleFallback: string;
  value: string | number;
  change: string;
  compareTextKey: string;
  compareTextFallback: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  isPositive?: boolean;
}

/**
 * A StatCard component that handles translations consistently
 */
const TranslatedStatCard: React.FC<TranslatedStatCardProps> = ({
  titleKey,
  titleFallback,
  value,
  change,
  compareTextKey,
  compareTextFallback,
  icon,
  className,
  iconClassName,
  valuePrefix,
  valueSuffix,
  isPositive
}) => {
  // Convert value to string if it's a number
  const stringValue = typeof value === 'number' ? value.toString() : value;
  
  return (
    <StatCard
      title={<TranslatedText keyName={titleKey} fallback={titleFallback} />}
      value={stringValue}
      change={change}
      compareText={<TranslatedText keyName={compareTextKey} fallback={compareTextFallback} />}
      icon={icon}
      className={className}
      iconClassName={iconClassName}
      valuePrefix={valuePrefix}
      valueSuffix={valueSuffix}
      isPositive={isPositive}
    />
  );
};

export default React.memo(TranslatedStatCard);
