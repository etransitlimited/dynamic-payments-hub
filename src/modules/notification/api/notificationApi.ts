
// 由于文件内容未提供，我会创建一个通用的notificationApi.ts文件
// 注意：这是基于API服务类构建的假设实现，可能需要根据实际情况调整

import { ApiService } from '@/core/api/apiService';
import { AxiosRequestConfig } from 'axios';

interface Notification {
  id: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  type: string;
}

// 创建通知API服务实例
const notificationService = new ApiService<Notification>('/api/notifications');

// 封装特定于通知的API调用
export const fetchNotifications = async (limit?: number) => {
  const config: AxiosRequestConfig = {};
  const params = limit ? { limit } : {};
  
  return notificationService.customGet<Notification[]>('', params, config);
};

export const markAsRead = async (id: string) => {
  return notificationService.update(id, { isRead: true });
};

export const markAllAsRead = async () => {
  return notificationService.customPost<{ success: boolean }>('mark-all-as-read');
};

export const deleteNotification = async (id: string) => {
  return notificationService.delete(id);
};

export default {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};
