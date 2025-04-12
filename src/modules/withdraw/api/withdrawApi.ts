
import { createApiService } from '@/core/api/apiFactory';

// 提现模块 API 路径定义
const WITHDRAW_API = {
  APPLY: '/withdraw/apply',
  LIST: '/withdraw/list',
  CANCEL: '/withdraw/cancel',
};

// 创建提现模块 API 服务
export const withdrawApi = createApiService(WITHDRAW_API);

// 导出 API 路径常量，便于直接访问
export const WITHDRAW_API_PATHS = WITHDRAW_API;
