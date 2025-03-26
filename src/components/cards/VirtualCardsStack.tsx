import { lazy, Suspense, memo } from "react";
import { usePerformance } from "@/hooks/use-performance";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load card components for better initial load performance
const MainCard = lazy(() => import("./MainCard"));

// Other card components only loaded based on performance tier
const BackgroundCard = lazy(() => import("./BackgroundCard"));
const CardDecorations = lazy(() => import("./CardDecorations"));

// Optimized loading placeholder
const CardLoading = () => (
  <Skeleton className="h-60 w-full max-w-md rounded-xl bg-blue-900/20" />
);

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
  
  return (
    <div className="relative h-80 w-full perspective-1000">
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
