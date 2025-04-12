
import { toast } from "sonner";
import { UserPermissions, DynamicRoute } from "@/types/permission";

// 存储当前用户权限信息
let currentPermissions: UserPermissions | null = null;

// 检查路由访问权限
export const checkRoutePermission = (path: string): boolean => {
  if (!currentPermissions) return false;
  return currentPermissions.routes.includes(path);
};

// 检查功能权限
export const checkPermission = (permissionCode: string): boolean => {
  if (!currentPermissions) return false;
  return currentPermissions.permissions.includes(permissionCode);
};

// 设置用户权限
export const setUserPermissions = (permissions: UserPermissions) => {
  currentPermissions = permissions;
};

// 清除权限信息
export const clearPermissions = () => {
  currentPermissions = null;
};

// 权限校验 HOC
export const withPermission = (
  WrappedComponent: React.ComponentType,
  requiredPermission: string
) => {
  return (props: any) => {
    if (!checkPermission(requiredPermission)) {
      toast.error("您没有访问该功能的权限");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

// 权限指令组件
export const PermissionGuard: React.FC<{
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ permission, children, fallback }) => {
  if (!checkPermission(permission)) {
    return fallback || null;
  }
  return <>{children}</>;
};
