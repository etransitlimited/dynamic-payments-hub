
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#061428]">
      <div className="text-center max-w-md p-6 rounded-lg bg-[#0F2643]/90 backdrop-blur-sm border border-blue-900/50 shadow-lg shadow-blue-900/10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-blue-200 mb-6">
          Oops! The page "{location.pathname}" was not found
        </p>
        <div className="space-y-2">
          <Button asChild variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
            <Link to="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
