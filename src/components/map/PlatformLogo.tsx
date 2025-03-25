
import React from "react";
import { 
  Amazon, 
  Facebook, 
  Tiktok, 
  Paypal, 
  ShoppingBag, 
  CreditCard,
  MessageCircle,
  AlignJustify,
  ShoppingCart,
  Search,
  FileText,
  CircleDollarSign
} from "lucide-react";

export type PlatformType = 
  | "Amazon" 
  | "Google Ads" 
  | "Facebook Ads" 
  | "Stripe" 
  | "PayPal" 
  | "Shopify" 
  | "TikTok" 
  | "AliExpress" 
  | "WeChat Pay" 
  | "Alipay" 
  | "Temu" 
  | "Lazada" 
  | "MercadoLibre" 
  | "Jumia" 
  | "M-Pesa" 
  | "JD.com" 
  | "Taobao";

interface PlatformLogoProps {
  platform: PlatformType;
  size?: number;
  className?: string;
}

const PlatformLogo: React.FC<PlatformLogoProps> = ({ 
  platform, 
  size = 18, 
  className = "" 
}) => {
  const getLogoComponent = () => {
    switch (platform) {
      case "Amazon":
        return <Amazon size={size} className={`text-[#FF9900] ${className}`} />;
      case "Facebook Ads":
        return <Facebook size={size} className={`text-[#1877F2] ${className}`} />;
      case "TikTok":
        return <Tiktok size={size} className={`text-[#000000] ${className}`} />;
      case "PayPal":
        return <Paypal size={size} className={`text-[#00457C] ${className}`} />;
      case "Shopify":
        return <ShoppingBag size={size} className={`text-[#7AB55C] ${className}`} />;
      case "Stripe":
        return <CreditCard size={size} className={`text-[#6772E5] ${className}`} />;
      case "Google Ads":
        return <Search size={size} className={`text-[#4285F4] ${className}`} />;
      case "WeChat Pay":
        return <MessageCircle size={size} className={`text-[#7BB32E] ${className}`} />;
      case "AliExpress":
        return <ShoppingCart size={size} className={`text-[#FF4747] ${className}`} />;
      case "Alipay":
        return <CircleDollarSign size={size} className={`text-[#00A0E9] ${className}`} />;
      case "Temu":
        return <ShoppingBag size={size} className={`text-[#FF4B4B] ${className}`} />;
      case "Lazada":
        return <ShoppingCart size={size} className={`text-[#F36F20] ${className}`} />;
      case "MercadoLibre":
        return <ShoppingCart size={size} className={`text-[#FFE600] ${className}`} />;
      case "Jumia":
        return <ShoppingBag size={size} className={`text-[#FF9900] ${className}`} />;
      case "M-Pesa":
        return <CircleDollarSign size={size} className={`text-[#4CAF50] ${className}`} />;
      case "JD.com":
        return <ShoppingCart size={size} className={`text-[#C91623] ${className}`} />;
      case "Taobao":
        return <ShoppingBag size={size} className={`text-[#FF6A00] ${className}`} />;
      default:
        return <FileText size={size} className={`text-gray-400 ${className}`} />;
    }
  };

  return (
    <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md p-1.5 transition-all hover:bg-white/20">
      {getLogoComponent()}
    </div>
  );
};

export default PlatformLogo;
