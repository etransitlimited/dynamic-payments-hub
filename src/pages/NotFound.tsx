
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
    const path = location.pathname.toLowerCase();
    
    // Define redirect patterns - this centralized approach makes it easier to maintain
    const redirectPatterns = [
      { pattern: /^\/wallet/, redirect: "/dashboard/wallet/deposit" },
      { pattern: /^\/cards/, redirect: "/dashboard/cards/search" },
      { pattern: /^\/analytics/, redirect: "/dashboard/analytics" },
      { pattern: /^\/transactions/, redirect: "/dashboard/transactions" },
      { pattern: /^\/merchant/, redirect: "/dashboard/merchant/account-management" },
      { pattern: /^\/invitation/, redirect: "/dashboard/invitation/list" }
    ];
    
    // Check each pattern and set redirect if matched
    for (const { pattern, redirect } of redirectPatterns) {
      if (pattern.test(path)) {
        setRedirect(redirect);
        break;
      }
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

    // Wallet related suggestions
    if (path.includes('wallet') || path.includes('deposit') || path.includes('fund')) {
      suggestions.push({ to: "/dashboard/wallet/deposit", label: "钱包充值" });
      suggestions.push({ to: "/dashboard/wallet/deposit-records", label: "充值记录" });
      suggestions.push({ to: "/dashboard/wallet/fund-details", label: "资金明细" });
    } 
    // Card related suggestions
    else if (path.includes('card')) {
      suggestions.push({ to: "/dashboard/cards/search", label: "卡片查询" });
      suggestions.push({ to: "/dashboard/cards/activation-tasks", label: "开卡任务" });
      suggestions.push({ to: "/dashboard/cards/apply", label: "申请卡片" });
    } 
    // Analytics related suggestions
    else if (path.includes('analytics') || path.includes('stat')) {
      suggestions.push({ to: "/dashboard/analytics", label: "数据统计" });
    }
    // Transaction related suggestions
    else if (path.includes('transaction')) {
      suggestions.push({ to: "/dashboard/transactions", label: "交易记录" });
    }
    // Merchant related suggestions
    else if (path.includes('merchant') || path.includes('account')) {
      suggestions.push({ to: "/dashboard/merchant/account-management", label: "账户管理" });
      suggestions.push({ to: "/dashboard/merchant/account-info", label: "帐号信息" });
      suggestions.push({ to: "/dashboard/merchant/account-roles", label: "账户角色" });
    } 
    // Invitation related suggestions
    else if (path.includes('invit') || path.includes('rebate')) {
      suggestions.push({ to: "/dashboard/invitation/list", label: "邀请列表" });
      suggestions.push({ to: "/dashboard/invitation/rebate-list", label: "返点列表" });
    }

    // Always add dashboard as a suggestion if we have other suggestions
    if (suggestions.length > 0 && !suggestions.some(s => s.to === "/dashboard")) {
      suggestions.unshift({ to: "/dashboard", label: "仪表板首页" });
    } 
    // If no suggestions based on path, add default ones
    else if (suggestions.length === 0) {
      suggestions.push({ to: "/dashboard", label: "仪表板首页" });
      suggestions.push({ to: "/", label: "网站首页" });
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
          页面 "{location.pathname}" 不存在
        </p>
        
        {suggestedLinks.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-blue-300 mb-2">您是否想访问:</h3>
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
            <Link to="/dashboard" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回仪表板
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-blue-300 hover:bg-blue-900/30"
            onClick={() => setShowHelp(true)}
          >
            需要帮助?
          </Button>
        </div>
      </div>
      
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-[#0F2643] border-blue-900/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-blue-100">需要帮助?</DialogTitle>
            <DialogDescription className="text-blue-300">
              以下是您可能看到此页面的一些常见原因:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-blue-200">
            <div>
              <h3 className="font-medium mb-1">可能的原因:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>URL可能拼写错误</li>
                <li>页面可能已被移动或重命名</li>
                <li>您可能没有访问此资源的权限</li>
                <li>请求可能缺少必需的参数</li>
              </ul>
            </div>
            <p>
              如果您认为这是一个错误，请联系支持或返回仪表板。
            </p>
          </div>
          <div className="flex justify-end">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard">前往仪表板</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotFound;
