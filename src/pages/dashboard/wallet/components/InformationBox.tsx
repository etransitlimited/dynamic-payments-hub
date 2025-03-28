
import React from "react";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/context/LanguageContext";

const InformationBox = () => {
  const { t } = useLanguage();
  
  return (
    <Alert className="bg-blue-900/20 border-blue-900/50 mt-6">
      <InfoIcon className="h-4 w-4 text-blue-400" />
      <AlertTitle className="text-blue-200">{t("wallet.depositRecords.infoTitle")}</AlertTitle>
      <AlertDescription className="text-blue-200/80">
        {t("wallet.depositRecords.infoDescription")}
      </AlertDescription>
    </Alert>
  );
};

export default InformationBox;
