
import { useState, useEffect } from "react";
import { DynamicRoute } from "@/types/permission";
import { setUserPermissions } from "@/utils/permissionUtils";
import { toast } from "sonner";
import { translationToString } from "@/utils/translationString";

export const useDynamicRoutes = () => {
  const [routes, setRoutes] = useState<DynamicRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDynamicRoutes = async () => {
      try {
        // 这里替换为实际的API调用
        const response = await fetch('/api/user/routes');
        const data = await response.json();
        
        // 设置动态路由
        setRoutes(data.routes);
        
        // 设置用户权限
        setUserPermissions({
          routes: data.routes.map((route: DynamicRoute) => route.path),
          permissions: data.permissions || []
        });
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '加载路由失败';
        setError(errorMessage);
        toast.error(translationToString(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    loadDynamicRoutes();
  }, []);

  return { routes, loading, error };
};
