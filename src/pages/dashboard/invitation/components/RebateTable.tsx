
import React from "react";
import { RebateRecord } from "../types";
import TranslatedText from "@/components/translation/TranslatedText";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RebateTableProps {
  records: RebateRecord[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const RebateTable: React.FC<RebateTableProps> = ({ 
  records, 
  currentPage, 
  setCurrentPage, 
  totalPages 
}) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="overflow-hidden rounded-xl border border-purple-900/30 bg-charcoal-dark/50">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-purple-900/20">
          <thead className="bg-purple-900/20">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                <TranslatedText keyName="common.id" fallback="ID" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                <TranslatedText keyName="invitation.rebate.invitee" fallback="Invitee" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                <TranslatedText keyName="invitation.rebate.amount" fallback="Amount" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                <TranslatedText keyName="invitation.rebate.statusLabel" fallback="Status" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-purple-200 uppercase tracking-wider">
                <TranslatedText keyName="invitation.rebate.date" fallback="Date" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-charcoal-dark/30 divide-y divide-purple-900/10">
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-purple-900/10 transition-colors group"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 font-mono">
                    {record.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                    {record.invitee}
                  </td>
                  <td 
                    className={cn(
                      "px-4 py-3 whitespace-nowrap text-sm font-medium flex items-center",
                      record.amount > 0 ? "text-neon-green" : "text-red-400"
                    )}
                  >
                    {record.amount > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1 text-neon-green" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1 text-red-400" />
                    )}
                    {record.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span 
                      className={cn(
                        "px-2 py-1 text-xs rounded-full font-medium",
                        record.status === "active" ? "bg-green-500/20 text-green-400" :
                        record.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                        "bg-red-500/20 text-red-400"
                      )}
                    >
                      <TranslatedText 
                        keyName={`invitation.rebate.status.${record.status}`} 
                        fallback={record.status.charAt(0).toUpperCase() + record.status.slice(1)} 
                      />
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                    {new Date(record.datetime).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  <TranslatedText keyName="common.noData" fallback="No data" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {records.length > 0 && (
        <div className="px-4 py-3 bg-charcoal-dark/50 border-t border-purple-900/20 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <TranslatedText 
              keyName="invitation.rebate.showing" 
              fallback="Showing" 
            /> {" "}
            <span className="font-medium text-purple-300">{records.length}</span> {" "}
            <TranslatedText 
              keyName="common.of" 
              fallback="of" 
            /> {" "}
            <span className="font-medium text-purple-300">{records.length}</span> {" "}
            <TranslatedText 
              keyName="invitation.rebate.records" 
              fallback="records" 
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-purple-900/30 text-gray-300 hover:bg-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-300">
              <TranslatedText keyName="common.page" fallback="Page" /> {" "}
              <span className="font-medium text-white">{currentPage}</span> {" "}
              <TranslatedText keyName="common.of" fallback="of" /> {" "}
              <span className="font-medium text-white">{totalPages || 1}</span>
            </span>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded-md border border-purple-900/30 text-gray-300 hover:bg-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RebateTable;
