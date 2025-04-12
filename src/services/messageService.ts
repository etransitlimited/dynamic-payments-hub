
import messagesData from '../data/messages.json';
import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'payment' | 'withdraw' | 'security' | 'card' | 'system' | 'account';
}

// Function to simulate fetching messages from an API
export const fetchMessages = async (limit: number = 5): Promise<Message[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = messagesData.messages.slice(0, limit);
      resolve(messages);
    }, 300);
  });
};

// Custom hook to manage messages state
export const useMessages = (limit: number = 5) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await fetchMessages(limit);
      setMessages(data);
      // Count unread messages
      setUnreadCount(data.filter(msg => !msg.read).length);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark a message as read
  const markAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
    
    // Update unread count
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all messages as read
  const markAllAsRead = () => {
    setMessages(prev => 
      prev.map(msg => ({ ...msg, read: true }))
    );
    setUnreadCount(0);
  };

  useEffect(() => {
    loadMessages();
  }, [limit]);

  return { messages, loading, unreadCount, markAsRead, markAllAsRead, refresh: loadMessages };
};
