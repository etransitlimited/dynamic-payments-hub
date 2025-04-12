
import { createApiService } from '@/core/api/apiFactory';

// 消息模块 API 路径定义
const MESSAGE_API = {
  LIST: '/message/list',
  READ: '/message/read',
  READ_ALL: '/message/readAll',
};

// 创建消息模块 API 服务
export const messageApi = createApiService(MESSAGE_API);

// 导出 API 路径常量，便于直接访问
export const MESSAGE_API_PATHS = MESSAGE_API;
