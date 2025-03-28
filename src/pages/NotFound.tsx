
import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NotFound = () => {
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Check if the route should be redirected to a dashboard path
    const path = location.pathname;
    if (path.startsWith('/wallet') || 
        path.startsWith('/cards') || 
        path.startsWith('/analytics') || 
        path.startsWith('/merchant') ||
        path.startsWith('/invitation') ||
        path.startsWith('/transactions')) {
      setRedirect(`/dashboard${path}`);
    }
  }, [location.pathname]);

  // If we need to redirect, do it
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  // Generate suggested links based on current path
  const getSuggestedLinks = () => {
    const path = location.pathname.toLowerCase();
    const suggestions = [];

    if (path.includes('wallet') || path.includes('deposit') || path.includes('fund')) {
      suggestions.push({ to: "/dashboard/wallet/deposit", label: "Wallet Deposit" });
      suggestions.push({ to: "/dashboard/wallet/deposit-records", label: "Deposit Records" });
      suggestions.push({ to: "/dashboard/wallet/fund-details", label: "Fund Details" });
    } else if (path.includes('card')) {
      suggestions.push({ to: "/dashboard/cards/search", label: "Card Search" });
      suggestions.push({ to: "/dashboard/cards/activation-tasks", label: "Activation Tasks" });
      suggestions.push({ to: "/dashboard/cards/apply", label: "Apply for Card" });
    } else if (path.includes('analytics') || path.includes('transactions')) {
      suggestions.push({ to: "/dashboard/analytics", label: "Analytics" });
      suggestions.push({ to: "/dashboard/transactions", label: "Transactions" });
    } else if (path.includes('merchant') || path.includes('account')) {
      suggestions.push({ to: "/dashboard/merchant/account-management", label: "Account Management" });
      suggestions.push({ to: "/dashboard/merchant/account-info", label: "Account Information" });
    } else if (path.includes('invit') || path.includes('rebate')) {
      suggestions.push({ to: "/dashboard/invitation/list", label: "Invitation List" });
      suggestions.push({ to: "/dashboard/invitation/rebate-list", label: "Rebate List" });
    }

    // Always add dashboard as a suggestion
    if (!suggestions.some(s => s.to === "/dashboard")) {
      suggestions.push({ to: "/dashboard", label: "Dashboard Home" });
    }

    return suggestions;
  };

  const suggestedLinks = getSuggestedLinks();

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
        
        {suggestedLinks.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-blue-300 mb-2">Did you mean to visit:</h3>
            <div className="space-y-2">
              {suggestedLinks.map((link, index) => (
                <Button 
                  key={index} 
                  asChild 
                  variant="outline" 
                  className="w-full border-blue-800 text-blue-200 hover:bg-blue-800/30"
                >
                  <Link to={link.to}>
                    {link.label}
                    <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button 
            asChild 
            variant="default" 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Link to="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-blue-300 hover:bg-blue-900/30"
            onClick={() => setShowHelp(true)}
          >
            Need help?
          </Button>
        </div>
      </div>
      
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-[#0F2643] border-blue-900/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-blue-100">Need assistance?</DialogTitle>
            <DialogDescription className="text-blue-300">
              Here are some common reasons you might be seeing this page:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-blue-200">
            <div>
              <h3 className="font-medium mb-1">Possible causes:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>The URL may be misspelled</li>
                <li>The page might have been moved or renamed</li>
                <li>You might not have permission to access this resource</li>
                <li>The request might be missing a required parameter</li>
              </ul>
            </div>
            <p>
              If you believe this is an error, please contact support or return to the dashboard.
            </p>
          </div>
          <div className="flex justify-end">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotFound;
