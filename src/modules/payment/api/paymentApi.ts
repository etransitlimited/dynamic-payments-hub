
import { createApiService } from '@/core/api/apiFactory';

// 支付模块 API 路径定义
const PAYMENT_API = {
  CREATE: '/payment/create',
  LIST: '/payment/list',
  DETAIL: '/payment/detail',
};

// 创建支付模块 API 服务
export const paymentApi = createApiService(PAYMENT_API);

// 导出 API 路径常量，便于直接访问
export const PAYMENT_API_PATHS = PAYMENT_API;
