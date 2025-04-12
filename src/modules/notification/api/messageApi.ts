
import { get, post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { Message } from '@/services/messageService';

// 消息模块API隔离层
export const message_api_en_get = async (limit: number = 5): Promise<Message[]> => {
  // 真实环境中这里会调用API
  // 目前使用模拟数据，保持与现有代码兼容
  return import('@/data/messages.json').then(module => {
    // 确保消息类型符合定义
    const messages: Message[] = module.default.messages.slice(0, limit).map(msg => ({
      ...msg,
      type: msg.type as Message['type']
    }));
    return messages;
  });
};

// 标记消息为已读
export const message_api_en_markAsRead = async (id: string): Promise<boolean> => {
  // 真实环境中这里会调用API
  // 目前只返回成功响应
  return Promise.resolve(true);
};

// 标记所有消息为已读
export const message_api_en_markAllAsRead = async (): Promise<boolean> => {
  // 真实环境中这里会调用API
  // 目前只返回成功响应
  return Promise.resolve(true);
};
