
import React from "react";
import { 
  ShoppingBag, 
  Facebook, 
  Video, 
  CreditCard,
  Search, 
  MessageCircle,
  ShoppingCart,
  CircleDollarSign,
  FileText,
  Store,
  Youtube,
  Twitter,
  Building,
  Smartphone,
  Globe
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
  | "eBay"
  | "Etsy"
  | "Walmart"
  | "Google Pay"
  | "Apple Pay"
  | "Godaddy"
  | "YouTube"
  | "Twitter"
  | "Other";

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
        return <ShoppingBag size={size} strokeWidth={1.5} className={`text-[#FF9900] ${className}`} />;
      case "Facebook Ads":
        return <Facebook size={size} strokeWidth={1.5} className={`text-[#1877F2] ${className}`} />;
      case "TikTok":
        return <Video size={size} strokeWidth={1.5} className={`text-[#000000] ${className}`} />;
      case "PayPal":
        return <CreditCard size={size} strokeWidth={1.5} className={`text-[#00457C] ${className}`} />;
      case "Shopify":
        return <ShoppingBag size={size} strokeWidth={1.5} className={`text-[#7AB55C] ${className}`} />;
      case "Stripe":
        return <CreditCard size={size} strokeWidth={1.5} className={`text-[#6772E5] ${className}`} />;
      case "Google Ads":
        return <Search size={size} strokeWidth={1.5} className={`text-[#4285F4] ${className}`} />;
      case "WeChat Pay":
        return <MessageCircle size={size} strokeWidth={1.5} className={`text-[#7BB32E] ${className}`} />;
      case "AliExpress":
        return <ShoppingCart size={size} strokeWidth={1.5} className={`text-[#FF4747] ${className}`} />;
      case "Alipay":
        return <CircleDollarSign size={size} strokeWidth={1.5} className={`text-[#00A0E9] ${className}`} />;
      case "Temu":
        return <ShoppingBag size={size} strokeWidth={1.5} className={`text-[#FF4B4B] ${className}`} />;
      case "eBay":
        return <ShoppingCart size={size} strokeWidth={1.5} className={`text-[#E53238] ${className}`} />;
      case "Etsy":
        return <Store size={size} strokeWidth={1.5} className={`text-[#F56400] ${className}`} />;
      case "Walmart":
        return <ShoppingCart size={size} strokeWidth={1.5} className={`text-[#0071CE] ${className}`} />;
      case "Google Pay":
        return <CircleDollarSign size={size} strokeWidth={1.5} className={`text-[#4285F4] ${className}`} />;
      case "Apple Pay":
        return <Smartphone size={size} strokeWidth={1.5} className={`text-[#000000] ${className}`} />;
      case "Godaddy":
        return <Globe size={size} strokeWidth={1.5} className={`text-[#7DB701] ${className}`} />;
      case "YouTube":
        return <Youtube size={size} strokeWidth={1.5} className={`text-[#FF0000] ${className}`} />;
      case "Twitter":
        return <Twitter size={size} strokeWidth={1.5} className={`text-[#1DA1F2] ${className}`} />;
      case "Other":
        return <FileText size={size} strokeWidth={1.5} className={`text-gray-400 ${className}`} />;
      default:
        return <FileText size={size} strokeWidth={1.5} className={`text-gray-400 ${className}`} />;
    }
  };

  return (
    <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-md p-1 transition-all hover:bg-white/20">
      {getLogoComponent()}
    </div>
  );
};

export default PlatformLogo;
