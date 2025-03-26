
import { useMemo } from 'react';
import { PlatformType } from '@/components/map/PlatformLogo';

// Core list of all available platforms
const allPlatforms: PlatformType[] = [
  "Amazon", 
  "eBay",
  "Etsy",
  "AliExpress", 
  "TikTok", 
  "Temu", 
  "Walmart",
  "Google Ads", 
  "Facebook Ads", 
  "Stripe", 
  "PayPal", 
  "Google Pay",
  "Apple Pay",
  "Godaddy",
  "WeChat Pay", 
  "Alipay",
  "Shopify", 
  "YouTube",
  "Twitter",
  "Other"
];

interface UsePlatformFilterOptions {
  performanceTier: string;
}

interface UsePlatformFilterResult {
  platforms: PlatformType[];
  gridClasses: string;
}

export function usePlatformFilter({ 
  performanceTier 
}: UsePlatformFilterOptions): UsePlatformFilterResult {
  // Filter platforms based on performance tier
  const platforms = useMemo(() => {
    const platformCount = {
      high: allPlatforms.length,
      medium: Math.min(allPlatforms.length, 15),
      low: Math.min(allPlatforms.length, 10)
    }[performanceTier];
    
    return allPlatforms.slice(0, platformCount);
  }, [performanceTier]);

  // Define grid layout based on performance and screen size
  const gridClasses = {
    high: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
    medium: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
    low: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
  }[performanceTier];

  return { platforms, gridClasses };
}
