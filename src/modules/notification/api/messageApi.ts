
import { get, post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { Message } from '@/services/messageService';

// 消息模块API隔离层
export const message_api_en_get = async (limit: number = 5): Promise<Message[]> => {
  try {
    // 真实API调用示例
    const response = await get<{ messages: Message[] }>(API_URLS.MESSAGE.LIST, { limit });
    
    // 返回标准化数据
    return response.messages.map(msg => ({
      ...msg,
      type: msg.type as Message['type']
    }));
  } catch (error) {
    // 错误已在 httpClient 中通过 toast 处理
    console.error('消息获取失败:', error);
    return [];
  }
  
  // 当前保留模拟数据作为备选方案
  /*
  return import('@/data/messages.json').then(module => {
    const messages: Message[] = module.default.messages.slice(0, limit).map(msg => ({
      ...msg,
      type: msg.type as Message['type']
    }));
    return messages;
  });
  */
};

// ... 保持其他方法不变
export const message_api_en_markAsRead = async (id: string): Promise<boolean> => {
  try {
    // 真实环境中调用API标记消息为已读
    await post(API_URLS.MESSAGE.READ, { id });
    return true;
  } catch (error) {
    // 错误已在 httpClient 中通过 toast 处理
    console.error('标记消息为已读失败:', error);
    return false;
  }
};

export const message_api_en_markAllAsRead = async (): Promise<boolean> => {
  try {
    // 真实环境中调用API标记所有消息为已读
    await post(API_URLS.MESSAGE.READ_ALL);
    return true;
  } catch (error) {
    // 错误已在 httpClient 中通过 toast 处理
    console.error('标记所有消息为已读失败:', error);
    return false;
  }
};

