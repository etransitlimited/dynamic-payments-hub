
import { createApiService } from '@/core/api/apiFactory';

// 卡片模块 API 路径定义
const CARD_API = {
  APPLY: '/card/apply',
  LIST: '/card/list',
  ACTIVATE: '/card/activate',
  DETAIL: '/card/detail',
  BLOCK: '/card/block',
};

// 创建卡片模块 API 服务
export const cardApi = createApiService(CARD_API);

// 导出 API 路径常量，便于直接访问
export const CARD_API_PATHS = CARD_API;
