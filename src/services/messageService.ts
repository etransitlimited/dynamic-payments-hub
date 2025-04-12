
import { useState, useEffect, useCallback } from "react";
import { message_api_get } from "@/modules/notification/api/messageApi";
import { useLanguage } from "@/context/LanguageContext";

// 消息类型定义
export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'payment' | 'security' | 'system';
}

// 本地存储未读状态的键
const MESSAGES_READ_STATUS_KEY = 'message_read_status';

// 从本地存储获取已读消息ID
const getReadMessageIds = (): string[] => {
  try {
    const savedStatus = localStorage.getItem(MESSAGES_READ_STATUS_KEY);
    return savedStatus ? JSON.parse(savedStatus) : [];
  } catch (e) {
    console.error("Failed to parse read message IDs:", e);
    return [];
  }
};

// 保存已读消息ID到本地存储
const saveReadMessageIds = (ids: string[]): void => {
  try {
    localStorage.setItem(MESSAGES_READ_STATUS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to save read message IDs:", e);
  }
};

// 获取消息
const fetchMessages = async (lang: string, limit: number = 10) => {
  try {
    return await message_api_get(lang as any, limit);
  } catch (error) {
    console.error("消息获取失败，尝试使用模拟数据:", error);
    return [];
  }
};

// 消息服务Hook
export const useMessages = (limit: number = 10) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [readMessageIds, setReadMessageIds] = useState<string[]>([]);

  // 加载消息
  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedMessages = await fetchMessages(language, limit);
      const savedReadIds = getReadMessageIds();
      
      // 更新消息的已读状态
      const updatedMessages = fetchedMessages.map(message => ({
        ...message,
        read: message.read || savedReadIds.includes(message.id)
      }));
      
      setMessages(updatedMessages);
      setReadMessageIds(savedReadIds);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  }, [language, limit]);

  // 标记消息为已读
  const markAsRead = useCallback((messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
    
    // 更新已读消息IDs
    const newReadIds = [...readMessageIds, messageId];
    setReadMessageIds(newReadIds);
    saveReadMessageIds(newReadIds);
  }, [readMessageIds]);

  // 全部标记为已读
  const markAllAsRead = useCallback(() => {
    setMessages(prev => prev.map(msg => ({ ...msg, read: true })));
    
    // 获取所有消息ID并保存为已读
    const allIds = messages.map(msg => msg.id);
    const newReadIds = [...new Set([...readMessageIds, ...allIds])];
    setReadMessageIds(newReadIds);
    saveReadMessageIds(newReadIds);
  }, [messages, readMessageIds]);

  // 计算未读消息数
  const unreadCount = messages.filter(msg => !msg.read).length;

  // 初始加载和语言变更时重新加载消息
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: loadMessages
  };
};
