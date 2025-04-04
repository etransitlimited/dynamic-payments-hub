
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { toast } from "sonner";

const ExportButton: React.FC = () => {
  const { t } = useSafeTranslation();

  const handleExport = () => {
    // Simulate export process
    toast.success(t("common.export") + " " + t("common.success"), {
      description: `${t("wallet.fundDetails.exportReport")} - ${new Date().toLocaleString()}`,
      position: "bottom-right"
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800/30 p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">
            {t("wallet.fundDetails.exportReport")}
          </h3>
          <p className="text-sm text-gray-400">
            {t("wallet.fundDetails.infoMessage")}
          </p>
        </div>
        <Button
          className="bg-purple-700 hover:bg-purple-600 text-white"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          {t("common.export")}
        </Button>
      </div>
    </div>
  );
};

export default ExportButton;
