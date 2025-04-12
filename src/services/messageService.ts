
import { useState, useEffect } from 'react';
import { message_api_en_get, message_api_en_markAsRead, message_api_en_markAllAsRead } from '@/modules/notification/api/messageApi';

export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'payment' | 'withdraw' | 'security' | 'card' | 'system' | 'account';
}

// 函数模拟从API获取消息
export const fetchMessages = async (limit: number = 5): Promise<Message[]> => {
  try {
    return await message_api_en_get(limit);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// 自定义Hook管理消息状态
export const useMessages = (limit: number = 5) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await fetchMessages(limit);
      setMessages(data);
      // 计算未读消息数量
      setUnreadCount(data.filter(msg => !msg.read).length);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // 标记消息为已读
  const markAsRead = async (id: string) => {
    try {
      const success = await message_api_en_markAsRead(id);
      if (success) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === id ? { ...msg, read: true } : msg
          )
        );
        
        // 更新未读消息数量
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  // 标记所有消息为已读
  const markAllAsRead = async () => {
    try {
      const success = await message_api_en_markAllAsRead();
      if (success) {
        setMessages(prev => 
          prev.map(msg => ({ ...msg, read: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all messages as read:', error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [limit]);

  return { messages, loading, unreadCount, markAsRead, markAllAsRead, refresh: loadMessages };
};
