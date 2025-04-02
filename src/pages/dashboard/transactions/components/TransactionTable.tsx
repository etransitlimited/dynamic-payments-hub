
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowUpDown, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Check,
  Clock,
  X,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Wallet
} from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

// 模拟交易数据
const transactions = [
  {
    id: "TX-2375091",
    user: "John Smith",
    amount: "$1,250.00",
    type: "deposit",
    status: "completed",
    date: "2023-07-12"
  },
  {
    id: "TX-2375085",
    user: "Sarah Johnson",
    amount: "$780.50",
    type: "withdrawal",
    status: "pending",
    date: "2023-07-11"
  },
  {
    id: "TX-2375079",
    user: "Michael Brown",
    amount: "$2,340.00",
    type: "transfer",
    status: "completed",
    date: "2023-07-10"
  },
  {
    id: "TX-2375064",
    user: "Emma Wilson",
    amount: "$450.25",
    type: "payment",
    status: "failed",
    date: "2023-07-09"
  },
  {
    id: "TX-2375051",
    user: "Robert Johnson",
    amount: "$1,840.00",
    type: "deposit",
    status: "completed",
    date: "2023-07-08"
  },
  {
    id: "TX-2375042",
    user: "Lisa Chen",
    amount: "$920.75",
    type: "withdrawal",
    status: "completed",
    date: "2023-07-07"
  },
  {
    id: "TX-2375038",
    user: "David Garcia",
    amount: "$3,500.00",
    type: "transfer",
    status: "pending",
    date: "2023-07-06"
  }
];

const TransactionTable = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  
  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft size={16} className="text-green-400 mr-1.5" />;
      case "withdrawal":
        return <ArrowUpRight size={16} className="text-red-400 mr-1.5" />;
      case "transfer":
        return <Wallet size={16} className="text-blue-400 mr-1.5" />;
      case "payment":
        return <CreditCard size={16} className="text-amber-400 mr-1.5" />;
      default:
        return <Banknote size={16} className="text-purple-400 mr-1.5" />;
    }
  };
  
  // 获取状态组件
  const getStatusComponent = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
            <Check size={12} className="mr-1" />
            <TranslatedText keyName="transactions.statusCompleted" fallback="Completed" />
          </div>
        );
      case "pending":
        return (
          <div className="px-2 py-1 rounded-full bg-amber-900/30 text-amber-400 text-xs flex items-center">
            <Clock size={12} className="mr-1" />
            <TranslatedText keyName="transactions.statusPending" fallback="Pending" />
          </div>
        );
      case "failed":
        return (
          <div className="px-2 py-1 rounded-full bg-red-900/30 text-red-400 text-xs flex items-center">
            <X size={12} className="mr-1" />
            <TranslatedText keyName="transactions.statusFailed" fallback="Failed" />
          </div>
        );
      default:
        return (
          <div className="px-2 py-1 rounded-full bg-gray-900/30 text-gray-400 text-xs flex items-center">
            <TranslatedText keyName="common.unknown" fallback="Unknown" />
          </div>
        );
    }
  };
  
  // 过滤交易
  const filteredTransactions = transactions.filter(tx => 
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tx.user.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div>
      {/* 搜索栏 */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={t("transactions.searchTransactions") || "Search transactions..."}
          className="w-full pl-10 pr-4 py-2 bg-charcoal-dark/60 border border-purple-900/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* 交易表格 */}
      <div className="overflow-x-auto rounded-lg border border-purple-900/20 bg-charcoal-dark/20 backdrop-blur-sm">
        <table className="w-full min-w-full divide-y divide-purple-900/10">
          <thead>
            <tr className="bg-charcoal-light/30">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                <div className="flex items-center">
                  <TranslatedText keyName="transactions.id" fallback="Transaction ID" />
                  <ArrowUpDown size={14} className="ml-1 text-gray-500" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                <div className="flex items-center">
                  <TranslatedText keyName="transactions.user" fallback="User" />
                  <ArrowUpDown size={14} className="ml-1 text-gray-500" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                <div className="flex items-center">
                  <TranslatedText keyName="transactions.amount" fallback="Amount" />
                  <ArrowUpDown size={14} className="ml-1 text-gray-500" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                <div className="flex items-center">
                  <TranslatedText keyName="transactions.type" fallback="Type" />
                  <ArrowUpDown size={14} className="ml-1 text-gray-500" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                <div className="flex items-center">
                  <TranslatedText keyName="transactions.status" fallback="Status" />
                  <ArrowUpDown size={14} className="ml-1 text-gray-500" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                <div className="flex items-center">
                  <TranslatedText keyName="transactions.date" fallback="Date" />
                  <ArrowUpDown size={14} className="ml-1 text-gray-500" />
                </div>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 tracking-wider">
                <TranslatedText keyName="transactions.actions" fallback="Actions" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-purple-900/10">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx, index) => (
                <tr 
                  key={tx.id}
                  className="hover:bg-purple-900/10 transition-colors group"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white font-mono">
                    {tx.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {tx.user}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`font-medium ${tx.type === 'deposit' ? 'text-green-400' : tx.type === 'withdrawal' ? 'text-red-400' : 'text-blue-400'}`}>
                      {tx.amount}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center">
                      {getTypeIcon(tx.type)}
                      <TranslatedText keyName={`transactions.${tx.type}`} fallback={tx.type} className="capitalize" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {getStatusComponent(tx.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <button className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-purple-900/20">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  <TranslatedText keyName="transactions.noTransactions" fallback="No transactions found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* 分页控件 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          <TranslatedText keyName="common.showing" fallback="Showing" /> 1-7 <TranslatedText keyName="common.of" fallback="of" /> 7 <TranslatedText keyName="common.records" fallback="records" />
        </div>
        <div className="flex space-x-2">
          <button className="p-1 rounded border border-purple-900/20 bg-charcoal-dark/50 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 rounded border border-purple-900/20 bg-charcoal-dark/50 text-gray-400 hover:text-white transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
