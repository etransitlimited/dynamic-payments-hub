
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const ViewAllLink: React.FC = () => {
  const { t } = useSafeTranslation();
  
  return (
    <div className="flex justify-center mt-8">
      <Link to="/dashboard/wallet/fund-details">
        <Button
          variant="ghost"
          className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/40 transition-all duration-300"
        >
          {t("wallet.fundDetails.viewAllRecords")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default ViewAllLink;
