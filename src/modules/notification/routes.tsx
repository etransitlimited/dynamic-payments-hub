
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";

// 懒加载通知页面组件
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));

/**
 * 获取通知模块的路由配置，确保包含语言前缀
 * @param lang 当前语言代码
 * @returns 通知模块的路由配置数组
 */
export const getNotificationRoutes = (lang: LanguageCode): RouteObject[] => {
  return [
    {
      path: `/${lang}/dashboard/notifications`,
      element: <NotificationsPage locale={lang} version="v1" />,
      handle: {
        isolationScope: "notification",
        requireAuth: true
      }
    }
  ];
};

export default getNotificationRoutes;
