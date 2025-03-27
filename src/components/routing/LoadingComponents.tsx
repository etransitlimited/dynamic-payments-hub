
import { Skeleton } from "@/components/ui/skeleton";

// Page loading component for public pages
export const PageLoading = () => (
  <div className="min-h-screen bg-[#061428] p-4">
    <Skeleton className="w-full h-20 bg-blue-900/10 rounded-lg mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="w-full h-60 bg-blue-900/10 rounded-lg" />
      <Skeleton className="w-full h-60 bg-blue-900/10 rounded-lg" />
    </div>
  </div>
);

// Dashboard loading component
export const DashboardLoading = () => (
  <div className="min-h-screen bg-slate-50 p-4">
    <Skeleton className="w-full h-16 bg-slate-200 rounded-lg mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
    </div>
    <Skeleton className="w-full h-80 bg-slate-200 rounded-lg" />
  </div>
);
