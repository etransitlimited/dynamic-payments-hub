
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const InformationBox = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg mt-6">
      <CardContent className="pt-6">
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
