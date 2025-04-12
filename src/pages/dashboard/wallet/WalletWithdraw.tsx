import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/dashboard/PageHeader";
import InformationBox from "../components/InformationBox";
import WithdrawForm from "../components/WithdrawForm";
import WithdrawHistory from "../components/WithdrawHistory";
import WithdrawSummary from "../components/WithdrawSummary";

const WalletWithdraw = () => {
  const { t } = useSafeTranslation();
  const { language } = useLanguage(); // 添加这一行来获取当前语言
  
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title={t('wallet.withdraw.title')} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-blue-950/40 rounded-lg p-6 mb-6">
            <WithdrawForm />
          </div>
          
          <InformationBox
            title={t('wallet.withdraw.informationTitle')}
            items={[
              { text: t('wallet.withdraw.info1') },
              { text: t('wallet.withdraw.info2') },
              { text: t('wallet.withdraw.info3') }
            ]}
            currentLanguage={language} // 添加这一行，传递当前语言
          />
        </div>
        
        <div className="space-y-6">
          <WithdrawSummary />
          <WithdrawHistory />
        </div>
      </div>
    </div>
  );
};

export default WalletWithdraw;
