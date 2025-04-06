
import React from "react";
import { Banknote, Globe, BarChart3, Bitcoin, CreditCard } from "lucide-react";

interface PaymentMethodIconProps {
  method: string;
  size?: number;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method, size = 16 }) => {
  switch (method) {
    case 'alipay':
      return (
        <span className="text-blue-400 bg-blue-400/10 p-1.5 rounded-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3" />
            <path d="M10 10h5" />
            <path d="M15 7v5.172a2 2 0 0 1-.586 1.414l-3.828 3.828" />
          </svg>
        </span>
      );
      
    case 'wechatPay':
    case 'wechat':
      return (
        <span className="text-green-400 bg-green-400/10 p-1.5 rounded-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 0-14h8.5a4.5 4.5 0 1 1 0 9H12v5" />
          </svg>
        </span>
      );
      
    case 'bankTransfer':
    case 'bank':
      return (
        <span className="text-yellow-400 bg-yellow-400/10 p-1.5 rounded-md flex items-center justify-center">
          <Banknote size={size} />
        </span>
      );
      
    case 'overseasBank':
      return (
        <span className="text-purple-400 bg-purple-400/10 p-1.5 rounded-md flex items-center justify-center">
          <Globe size={size} />
        </span>
      );
      
    case 'platformTransfer':
    case 'platform':
      return (
        <span className="text-green-400 bg-green-400/10 p-1.5 rounded-md flex items-center justify-center">
          <CreditCard size={size} />
        </span>
      );
      
    case 'cryptoCurrency':
    case 'crypto':
      return (
        <span className="text-orange-400 bg-orange-400/10 p-1.5 rounded-md flex items-center justify-center">
          <Bitcoin size={size} />
        </span>
      );
      
    default:
      return (
        <span className="text-gray-400 bg-gray-400/10 p-1.5 rounded-md flex items-center justify-center">
          <Banknote size={size} />
        </span>
      );
  }
};

export default PaymentMethodIcon;
