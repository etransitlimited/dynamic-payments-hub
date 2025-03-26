
import { lazy, Suspense } from "react";
import { usePerformance } from "@/hooks/use-performance";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load card components for better initial load performance
const MainCard = lazy(() => import("./MainCard"));
const BackgroundCard = lazy(() => import("./BackgroundCard"));
const CardDecorations = lazy(() => import("./CardDecorations"));

// Optimized loading placeholder
const CardLoading = () => (
  <Skeleton className="h-60 w-full max-w-md rounded-xl bg-blue-900/20" />
);

// Stack of virtual cards with animation, now with performance optimizations
const VirtualCardsStack = () => {
  const { performanceTier } = usePerformance();
  
  return (
    <div className="relative h-80 w-full perspective-1000">
      {/* Main Card - always rendered */}
      <Suspense fallback={<CardLoading />}>
        <MainCard />
      </Suspense>
      
      {/* Background Cards - conditionally rendered based on performance */}
      {performanceTier !== 'low' && (
        <Suspense fallback={null}>
          <BackgroundCard index={0} />
          {performanceTier === 'high' && <BackgroundCard index={1} />}
        </Suspense>
      )}
      
      {/* Decorative Elements - conditionally rendered based on performance */}
      {performanceTier !== 'low' && (
        <Suspense fallback={null}>
          <CardDecorations />
        </Suspense>
      )}
    </div>
  );
};

export default VirtualCardsStack;
