
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, Shield, CreditCard, Wallet, ArrowUpRight } from "lucide-react";
import PageHeader from "./components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AccountManagement = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title={t("accountManagement.title")} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <Users size={18} className="text-purple-300" />
              </span>
              {t("accountManagement.userManagement")}
            </CardTitle>
            <CardDescription className="text-purple-200/80">
              {t("accountManagement.userManagementDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid gap-4">
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.activeUsers")}</span>
                </div>
                <span className="font-bold">245</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.inactiveUsers")}</span>
                </div>
                <span className="font-bold">32</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/merchant/account-roles" className="flex items-center justify-center">
                <span>{t("accountManagement.manageUsers")}</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <Shield size={18} className="text-purple-300" />
              </span>
              {t("accountManagement.rolePermissions")}
            </CardTitle>
            <CardDescription className="text-purple-200/80">
              {t("accountManagement.rolePermissionsDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid gap-4">
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.adminRoles")}</span>
                </div>
                <span className="font-bold">5</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.editorRoles")}</span>
                </div>
                <span className="font-bold">12</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/merchant/account-roles" className="flex items-center justify-center">
                <span>{t("accountManagement.manageRoles")}</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <CreditCard size={18} className="text-purple-300" />
              </span>
              {t("accountManagement.cardManagement")}
            </CardTitle>
            <CardDescription className="text-purple-200/80">
              {t("accountManagement.cardManagementDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid gap-4">
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.activeCards")}</span>
                </div>
                <span className="font-bold">138</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.pendingCards")}</span>
                </div>
                <span className="font-bold">27</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/cards/search" className="flex items-center justify-center">
                <span>{t("accountManagement.viewCards")}</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <Wallet size={18} className="text-purple-300" />
              </span>
              {t("accountManagement.depositManagement")}
            </CardTitle>
            <CardDescription className="text-purple-200/80">
              {t("accountManagement.depositManagementDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid gap-4">
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.totalDeposits")}</span>
                </div>
                <span className="font-bold">$25,845</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-purple-300" />
                  <span>{t("accountManagement.pendingDeposits")}</span>
                </div>
                <span className="font-bold">$3,240</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/wallet/deposit-records" className="flex items-center justify-center">
                <span>{t("accountManagement.viewDeposits")}</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AccountManagement;
