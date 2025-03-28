
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft, Home, CreditCard, Wallet, Store, UserPlus, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // More precise path checking for better recommendations
  const isDashboardPath = location.pathname.includes("/dashboard");
  const isWalletPath = location.pathname.includes("/wallet") || location.pathname.includes("/dashboard/wallet");
  const isCardPath = location.pathname.includes("/card") || location.pathname.includes("/dashboard/card") || 
                    location.pathname.includes("/cards") || location.pathname.includes("/dashboard/cards");
  const isTransactionsPath = location.pathname.includes("/transaction") || location.pathname.includes("/dashboard/transaction") ||
                            location.pathname.includes("/transactions") || location.pathname.includes("/dashboard/transactions");
  const isMerchantPath = location.pathname.includes("/merchant") || location.pathname.includes("/dashboard/merchant");
  const isInvitationPath = location.pathname.includes("/invitation") || location.pathname.includes("/dashboard/invitation");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#061428]">
      <div className="text-center max-w-md p-6 rounded-lg bg-[#0F2643]/90 backdrop-blur-sm border border-blue-900/50 shadow-lg shadow-blue-900/10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-blue-200 mb-6">
          页面未找到: "{location.pathname}"
        </p>
        <div className="space-y-2">
          <Button asChild variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
            <Link to={isDashboardPath ? "/dashboard" : "/"} className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isDashboardPath ? "返回仪表板" : "返回首页"}
            </Link>
          </Button>
          
          {isTransactionsPath && (
            <Button asChild variant="outline" className="w-full border-blue-600/60 text-white hover:bg-blue-900/20">
              <Link to="/dashboard/transactions" className="flex items-center justify-center">
                <Landmark className="mr-2 h-4 w-4" />
                前往交易记录
              </Link>
            </Button>
          )}
          
          {isWalletPath && (
            <Button asChild variant="outline" className="w-full border-blue-600/60 text-white hover:bg-blue-900/20">
              <Link to="/dashboard/wallet/deposit" className="flex items-center justify-center">
                <Wallet className="mr-2 h-4 w-4" />
                前往钱包
              </Link>
            </Button>
          )}
          
          {isCardPath && (
            <Button asChild variant="outline" className="w-full border-blue-600/60 text-white hover:bg-blue-900/20">
              <Link to="/dashboard/cards/search" className="flex items-center justify-center">
                <CreditCard className="mr-2 h-4 w-4" />
                前往卡片查询
              </Link>
            </Button>
          )}
          
          {isMerchantPath && (
            <Button asChild variant="outline" className="w-full border-blue-600/60 text-white hover:bg-blue-900/20">
              <Link to="/dashboard/merchant/account-management" className="flex items-center justify-center">
                <Store className="mr-2 h-4 w-4" />
                前往商户中心
              </Link>
            </Button>
          )}
          
          {isInvitationPath && (
            <Button asChild variant="outline" className="w-full border-blue-600/60 text-white hover:bg-blue-900/20">
              <Link to="/dashboard/invitation/list" className="flex items-center justify-center">
                <UserPlus className="mr-2 h-4 w-4" />
                前往邀请列表
              </Link>
            </Button>
          )}
          
          {(isDashboardPath || isWalletPath || isCardPath || isTransactionsPath || isMerchantPath || isInvitationPath) && (
            <Button asChild variant="outline" className="w-full border-blue-600/60 text-white hover:bg-blue-900/20">
              <Link to="/dashboard" className="flex items-center justify-center">
                <Home className="mr-2 h-4 w-4" />
                仪表板首页
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
