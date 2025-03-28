
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const InformationBox = () => {
  return (
    <Card className="bg-gradient-to-br from-[#0F2643]/90 to-[#091B34]/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm overflow-hidden mt-6">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardContent className="pt-6 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-900/50 p-2 rounded-full">
            <Info className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-1">Transaction Information</h4>
            <p className="text-xs text-blue-300/80">
              These records show all fund transactions associated with your account. For any questions regarding your transactions, please contact customer support.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationBox;
