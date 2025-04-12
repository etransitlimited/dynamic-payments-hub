
import { createApiService } from '@/core/api/apiFactory';

// 用户模块 API 路径定义
const USER_API = {
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  PROFILE: '/user/profile',
  UPDATE_PASSWORD: '/user/updatePassword',
  REFRESH_TOKEN: '/auth/refresh',
};

// 创建用户模块 API 服务
export const userApi = createApiService(USER_API);

// 导出 API 路径常量，便于直接访问
export const USER_API_PATHS = USER_API;
