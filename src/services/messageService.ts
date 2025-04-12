
import { useState, useEffect } from 'react';
import { get } from '@/core/api/httpClient';

export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'system' | 'payment' | 'security' | 'notification';
}

// 模拟数据
const mockMessages: Message[] = [
  {
    id: 'msg-001',
    title: '系统维护通知',
    content: '系统将于2023-12-20进行例行维护，请提前做好准备。',
    timestamp: '2023-12-15T10:30:00',
    read: false,
    type: 'system'
  },
  {
    id: 'msg-002',
    title: '支付成功提醒',
    content: '您的账户已成功充值1000元。',
    timestamp: '2023-12-14T15:45:00',
    read: true,
    type: 'payment'
  },
  {
    id: 'msg-003',
    title: '登录安全提醒',
    content: '检测到您的账户在新设备上登录，如非本人操作，请立即修改密码。',
    timestamp: '2023-12-13T08:20:00',
    read: false,
    type: 'security'
  },
  {
    id: 'msg-004',
    title: '卡片激活成功',
    content: '您的虚拟卡已成功激活，现在可以使用了。',
    timestamp: '2023-12-12T16:10:00',
    read: false,
    type: 'notification'
  }
];

export const useMessages = (limit?: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        // 在实际应用中，这里应该从API获取消息
        // const response = await get<Message[]>('/messages');
        // const fetchedMessages = response.data;
        
        // 使用模拟数据
        const fetchedMessages = [...mockMessages];
        if (limit) {
          fetchedMessages.splice(limit);
        }
        
        setMessages(fetchedMessages);
        setUnreadCount(fetchedMessages.filter(msg => !msg.read).length);
      } catch (error) {
        console.error('获取消息失败:', error);
        setMessages([]);
        setUnreadCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // 设置轮询以定期检查新消息（实际应用中可能使用WebSocket）
    const interval = setInterval(fetchMessages, 60000); // 每分钟检查一次
    
    return () => {
      clearInterval(interval);
    };
  }, [limit]);

  const markAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setMessages(prev => 
      prev.map(msg => ({ ...msg, read: true }))
    );
    setUnreadCount(0);
  };

  return {
    messages,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead
  };
};
