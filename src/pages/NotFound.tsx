
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

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
      <div className="text-center max-w-md px-4">
        <div className="rounded-full bg-blue-900/20 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <span className="text-5xl font-bold text-blue-400">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">Page Not Found</h1>
        <p className="text-lg text-blue-200/80 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Link to="/">
              <Home size={18} />
              <span>Home Page</span>
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className="gap-2 border-blue-600 text-white hover:bg-blue-900/20"
            onClick={() => window.history.back()}
          >
            <Link to="#">
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
