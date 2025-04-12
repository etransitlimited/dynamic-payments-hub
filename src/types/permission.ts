
export type Permission = {
  code: string;
  name: string;
  description?: string;
};

export type DynamicRoute = {
  path: string;
  component: string;
  permissions: string[];
  meta?: {
    title?: string;
    icon?: string;
  };
  children?: DynamicRoute[];
};

export type UserPermissions = {
  routes: string[];      // 用户被授权的路由路径
  permissions: string[]; // 用户被授权的权限代码
};
