
/**
 * Format a number as USD currency
 */
export const formatUSD = (value: number): string => {
  try {
    // Handle special cases first
    if (isNaN(value)) {
      console.warn(`formatUSD received NaN value`);
      return '$0.00';
    }
    
    if (!isFinite(value)) {
      console.warn(`formatUSD received non-finite value: ${value}`);
      return value > 0 ? '$∞' : '-$∞';
    }
    
    // Format positive and negative numbers accordingly
    const absValue = Math.abs(value);
    
    // Use Intl.NumberFormat for consistent formatting
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    const formatted = formatter.format(absValue);
    
    // Return with appropriate sign
    return value < 0 ? `-${formatted}` : formatted;
  } catch (error) {
    console.error(`Error formatting value ${value} as USD:`, error);
    // Fallback to a simpler formatting method
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    return `${sign}$${absValue.toFixed(2)}`;
  }
};

/**
 * Format a number as a percentage
 */
export const formatPercent = (value: number, decimals: number = 1): string => {
  try {
    // Handle special cases first
    if (isNaN(value)) {
      console.warn(`formatPercent received NaN value`);
      return '0%';
    }
    
    if (!isFinite(value)) {
      console.warn(`formatPercent received non-finite value: ${value}`);
      return value > 0 ? '∞%' : '-∞%';
    }
    
    // Use Intl.NumberFormat for consistent formatting
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    
    return formatter.format(value / 100);
  } catch (error) {
    console.error(`Error formatting value ${value} as percentage:`, error);
    // Fallback to a simpler formatting method
    return `${value.toFixed(decimals)}%`;
  }
};
