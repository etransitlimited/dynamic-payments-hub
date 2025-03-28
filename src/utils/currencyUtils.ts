
/**
 * Currency utility functions for consistent formatting throughout the application
 */

/**
 * Formats a number as a USD currency string
 * @param value The number to format
 * @param options Optional Intl.NumberFormatOptions to customize the formatting
 * @returns Formatted currency string with $ symbol
 */
export const formatUSD = (value: number | string, options?: Intl.NumberFormatOptions): string => {
  // Convert string to number if needed
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Handle NaN
  if (isNaN(numericValue)) {
    return '$0.00';
  }

  // Default options for USD formatting
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };

  // Format the value
  return new Intl.NumberFormat('en-US', defaultOptions).format(numericValue);
};

/**
 * Formats a number as a USD currency string without the $ symbol
 * @param value The number to format
 * @returns Formatted currency string without $ symbol
 */
export const formatUSDValue = (value: number | string): string => {
  const formatted = formatUSD(value);
  // Remove the $ symbol
  return formatted.replace('$', '');
};

/**
 * Parses a formatted currency string into a number
 * @param value The currency string to parse
 * @returns Numeric value
 */
export const parseCurrencyValue = (value: string): number => {
  // Remove currency symbols, commas, and other non-numeric characters except decimal point
  const numericString = value.replace(/[^0-9.-]/g, '');
  return parseFloat(numericString);
};
