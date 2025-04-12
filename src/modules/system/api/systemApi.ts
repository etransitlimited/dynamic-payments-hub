
import { createApiService } from '@/core/api/apiFactory';

// 系统模块 API 路径定义
const SYSTEM_API = {
  CONFIG: '/system/config',
  NOTICE: '/system/notice',
};

// 创建系统模块 API 服务
export const systemApi = createApiService(SYSTEM_API);

// 导出 API 路径常量，便于直接访问
export const SYSTEM_API_PATHS = SYSTEM_API;
