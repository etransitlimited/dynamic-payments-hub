
import { lazy, Suspense, memo } from "react";
import { usePerformance } from "@/hooks/use-performance";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load card components for better initial load performance
const MainCard = lazy(() => import("./MainCard"));

// Other card components only loaded based on performance tier
const BackgroundCard = lazy(() => import("./BackgroundCard"));
const CardDecorations = lazy(() => import("./CardDecorations"));

// Optimized loading placeholder
const CardLoading = () => {
  const isMobile = useIsMobile();
  return (
    <Skeleton className={`${isMobile ? 'h-48 w-full max-w-[280px]' : 'h-60 w-full max-w-md'} rounded-xl bg-blue-900/20`} />
  );
};

// Performance-optimized memoized card components
const OptimizedBackgroundCard = memo(({ index }: { index: number }) => (
  <Suspense fallback={null}>
    <BackgroundCard index={index} />
  </Suspense>
));

const OptimizedCardDecorations = memo(() => (
  <Suspense fallback={null}>
    <CardDecorations />
  </Suspense>
));

// Stack of virtual cards with animation, now with performance optimizations
const VirtualCardsStack = () => {
  const { performanceTier, useGlowEffects } = usePerformance();
  const isMobile = useIsMobile();
  
  return (
    <div className={`relative ${isMobile ? 'h-64 w-[300px]' : 'h-80 w-[384px]'} mx-auto perspective-1000`}>
      {/* Main Card - always rendered */}
      <Suspense fallback={<CardLoading />}>
        <MainCard />
      </Suspense>
      
      {/* Background Cards - conditionally rendered based on performance */}
      {performanceTier !== 'low' && <OptimizedBackgroundCard index={0} />}
      {performanceTier === 'high' && <OptimizedBackgroundCard index={1} />}
      
      {/* Decorative Elements - conditionally rendered based on performance */}
      {useGlowEffects && <OptimizedCardDecorations />}
    </div>
  );
};

export default memo(VirtualCardsStack);
