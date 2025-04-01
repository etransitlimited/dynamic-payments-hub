
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface InformationBoxProps {
  title?: string;
  description?: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({ 
  title, 
  description 
}) => {
  const { t } = useLanguage();
  
  const boxTitle = title || t("wallet.depositRecords.infoTitle");
  const boxDescription = description || t("wallet.depositRecords.infoDescription");
  
  return (
    <Card className="mt-6 bg-blue-900/20 border-blue-700/30">
      <CardContent className="p-4 flex gap-3">
        <div className="shrink-0">
          <AlertCircle className="h-5 w-5 text-blue-300" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-blue-200 mb-1">{boxTitle}</h4>
          <p className="text-xs text-blue-300/80">{boxDescription}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationBox;
