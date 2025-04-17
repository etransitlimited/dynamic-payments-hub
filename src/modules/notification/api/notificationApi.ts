
import { get, post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { ApiService, createApiService } from '@/core/api/apiService';
import { Message } from "@/services/messageService";
import { LanguageCode } from "@/utils/languageUtils";

// 创建消息模块API服务实例
const messageApiService = createApiService<Message>(API_URLS.MESSAGE.LIST);

// 消息模块API接口 - 遵循隔离规范，添加语言前缀
export const notification_api_en_getMessages = async (params?: {limit?: number}): Promise<Message[]> => {
  // 确保在API调用前令牌已恢复
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
  if (token && !localStorage.getItem('authToken')) {
    localStorage.setItem('authToken', token);
  }
  
  return get<Message[]>(API_URLS.MESSAGE.LIST, params);
};

export const notification_api_en_readMessage = async (id: string): Promise<boolean> => {
  return post<boolean>(API_URLS.MESSAGE.READ, { id });
};

export const notification_api_en_readAllMessages = async (): Promise<boolean> => {
  return post<boolean>(API_URLS.MESSAGE.READ_ALL, {});
};

// 本地模拟数据获取
export const message_api_get = async (lang: LanguageCode, limit: number = 10): Promise<Message[]> => {
  try {
    // 确保在API调用前令牌已恢复
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    if (token && !localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', token);
    }
    
    // 这里可以替换为真实的API调用
    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 获取对应语言的消息，如果没有则使用英文
    const mockMessages: Record<string, Message[]> = {
      "en": [
        { id: "1", title: "System Maintenance", content: "System will undergo maintenance from 22:00 to 02:00.", timestamp: "2025-04-10T22:00:00", read: false, type: "system" },
        { id: "2", title: "Payment Success", content: "Your payment of $500 has been processed successfully.", timestamp: "2025-04-09T14:30:00", read: true, type: "payment" },
        { id: "3", title: "Security Alert", content: "A new device was used to log in to your account.", timestamp: "2025-04-08T09:15:00", read: false, type: "security" },
        { id: "4", title: "Card Activation", content: "Your virtual card has been activated and is ready to use.", timestamp: "2025-04-07T16:45:00", read: true, type: "system" }
      ],
      "zh-CN": [
        { id: "1", title: "系统维护", content: "系统将于22:00至02:00进行维护。", timestamp: "2025-04-10T22:00:00", read: false, type: "system" },
        { id: "2", title: "支付成功", content: "您的500元支付已成功处理。", timestamp: "2025-04-09T14:30:00", read: true, type: "payment" },
        { id: "3", title: "安全提醒", content: "检测到新设备登录您的账户。", timestamp: "2025-04-08T09:15:00", read: false, type: "security" },
        { id: "4", title: "卡片激活", content: "您的虚拟卡已激活，可以使用了。", timestamp: "2025-04-07T16:45:00", read: true, type: "system" }
      ]
    };
    
    const messages = mockMessages[lang] || mockMessages["en"];
    
    // 根据 limit 限制返回的消息数量
    return messages.slice(0, limit);
  } catch (error) {
    console.error("消息获取失败，尝试使用模拟数据:", error);
    // 出错时返回空数组
    return [];
  }
};

// 导出消息模块的API服务
export default messageApiService;
