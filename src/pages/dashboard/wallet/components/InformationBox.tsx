
import React from "react";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TranslatedText from "@/components/translation/TranslatedText";

const InformationBox = () => {
  return (
    <Alert className="mt-6 bg-indigo-900/20 border-indigo-900/30 text-blue-100">
      <InfoIcon className="h-4 w-4 mr-2 text-blue-300" />
      <AlertDescription className="text-sm">
        <TranslatedText 
          keyName="wallet.fundDetails.infoMessage" 
          fallback="The transaction data is updated in real-time. For detailed reports, use the Export feature to download a comprehensive statement."
        />
      </AlertDescription>
    </Alert>
  );
};

export default InformationBox;
