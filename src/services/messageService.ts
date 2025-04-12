
import { useState, useEffect } from 'react';
import { get } from '@/core/api/httpClient';
import { message_api_get } from '@/modules/notification/api/messageApi';
import { LanguageCode } from '@/utils/languageUtils';

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
  },
  {
    id: 'msg-005',
    title: '账户余额变动',
    content: '您的账户余额有变动，请查看交易详情。',
    timestamp: '2023-12-11T09:20:00',
    read: false,
    type: 'payment'
  },
  {
    id: 'msg-006',
    title: '密码重置通知',
    content: '您的账户密码已成功重置，如非本人操作，请立即联系客服。',
    timestamp: '2023-12-10T14:15:00',
    read: true,
    type: 'security'
  },
  {
    id: 'msg-007',
    title: '新版本发布',
    content: '系统已发布新版本，带来更多功能和体验改进。',
    timestamp: '2023-12-09T11:30:00',
    read: true,
    type: 'system'
  },
  {
    id: 'msg-008',
    title: '账户升级提醒',
    content: '恭喜您！您的账户已升级为高级会员。',
    timestamp: '2023-12-08T16:45:00',
    read: false,
    type: 'notification'
  },
  {
    id: 'msg-009',
    title: '交易限额变更',
    content: '您的账户交易限额已调整，详情请查看账户设置。',
    timestamp: '2023-12-07T10:20:00',
    read: false,
    type: 'payment'
  },
  {
    id: 'msg-010',
    title: '数据安全更新',
    content: '我们更新了数据安全策略，请查看最新的隐私条款。',
    timestamp: '2023-12-06T09:10:00',
    read: true,
    type: 'security'
  },
  {
    id: 'msg-011',
    title: '系统维护完成',
    content: '系统维护已完成，所有功能恢复正常。',
    timestamp: '2023-12-05T22:30:00',
    read: true,
    type: 'system'
  },
  {
    id: 'msg-012',
    title: '新功能发布',
    content: '新的数据分析功能已上线，欢迎体验。',
    timestamp: '2023-12-04T14:40:00',
    read: false,
    type: 'notification'
  }
];

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface MessagesResult {
  messages: Message[];
  pagination: PaginationInfo;
}

export const useMessages = (pageSize: number = 5) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize,
    total: 0,
    totalPages: 1
  });

  const fetchMessages = async (page: number = 1) => {
    setLoading(true);
    try {
      // 在实际应用中，这里应该从API获取消息
      // const response = await get<MessagesResult>(`/messages?page=${page}&pageSize=${pageSize}`);
      // const { messages: fetchedMessages, pagination } = response.data;
      
      // 使用模拟数据进行分页
      const totalMessages = [...mockMessages];
      const totalItems = totalMessages.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      
      // 计算当前页数据的起始和结束索引
      const startIndex = (page - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalItems);
      
      // 获取当前页数据
      const paginatedMessages = totalMessages.slice(startIndex, endIndex);
      
      // 更新状态
      setMessages(paginatedMessages);
      setPagination({
        page,
        pageSize,
        total: totalItems,
        totalPages
      });
      
      // 计算未读消息数量（基于所有消息）
      const unreadMessageCount = totalMessages.filter(msg => !msg.read).length;
      setUnreadCount(unreadMessageCount);
    } catch (error) {
      console.error('获取消息失败:', error);
      setMessages([]);
      setUnreadCount(0);
      setPagination({
        page: 1,
        pageSize,
        total: 0,
        totalPages: 1
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(currentPage);
    
    // 设置轮询以定期检查新消息（实际应用中可能使用WebSocket）
    const interval = setInterval(() => fetchMessages(currentPage), 60000); // 每分钟检查一次
    
    return () => {
      clearInterval(interval);
    };
  }, [currentPage, pageSize]);

  const markAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    // 在实际应用中，应发送请求更新服务器上的消息状态
    // await post(`/messages/${id}/read`);
  };

  const markAllAsRead = () => {
    setMessages(prev => 
      prev.map(msg => ({ ...msg, read: true }))
    );
    setUnreadCount(0);
    
    // 在实际应用中，应发送请求更新服务器上的消息状态
    // await post('/messages/read-all');
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    messages,
    unreadCount,
    loading,
    pagination,
    markAsRead,
    markAllAsRead,
    goToPage,
    currentPage
  };
};
