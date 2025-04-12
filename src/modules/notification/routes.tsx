
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";

// 懒加载通知页面组件
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));

// 导出通知模块的路由配置
export const getNotificationRoutes = (lang: LanguageCode): RouteObject[] => {
  return [
    {
      path: `${lang}/dashboard/notifications`,
      element: <NotificationsPage currentLanguage={lang} />,
      handle: {
        isolationScope: "notification",
        requireAuth: true
      }
    }
  ];
};

export default getNotificationRoutes;
