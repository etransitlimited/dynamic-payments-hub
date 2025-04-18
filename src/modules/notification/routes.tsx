
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
  // 创建两种路由路径 - 带有语言前缀和不带语言前缀
  return [
    // 带语言前缀的路由
    {
      path: `/${lang}/dashboard/notifications`,
      element: <NotificationsPage locale={lang} version="v1" />,
      handle: {
        isolationScope: "notification",
        requireAuth: true,
        breadcrumb: {
          key: "notification.title",
          fallback: "Notifications"
        }
      }
    },
    // 不带语言前缀的路由（兼容）
    {
      path: `/dashboard/notifications`,
      element: <NotificationsPage locale={lang} version="v1" />,
      handle: {
        isolationScope: "notification",
        requireAuth: true,
        breadcrumb: {
          key: "notification.title",
          fallback: "Notifications"
        }
      }
    }
  ];
};

export default getNotificationRoutes;
