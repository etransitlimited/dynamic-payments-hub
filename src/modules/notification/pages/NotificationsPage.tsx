
import React, { useState, useEffect, useCallback } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMessages, Message } from "@/services/messageService";
import { LanguageCode } from "@/utils/languageUtils";
import PageLayout from "@/components/dashboard/PageLayout";
import TranslatedText from "@/components/translation/TranslatedText";
import NotificationType from "../components/NotificationType";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { getRelativeNotificationTime } from "../utils/notificationUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface NotificationsPageProps {
  locale: LanguageCode;
  version: "v1"|"v2";
}

/**
 * 通知页面组件
 * 显示用户的所有通知以及未读通知
 */
const NotificationsPage: React.FC<NotificationsPageProps> = ({ 
  locale = "en" as LanguageCode,
  version = "v1"
}) => {
  const PAGE_SIZE = 5; // 每页显示的消息数量
  const { 
    messages, 
    loading, 
    markAsRead, 
    markAllAsRead, 
    pagination, 
    goToPage,
    currentPage 
  } = useMessages(PAGE_SIZE);
  
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  
  // 确保组件使用正确的语言
  useEffect(() => {
    if (locale) {
      document.documentElement.setAttribute('data-language', locale);
      // 强制刷新翻译
      const event = new CustomEvent('app:languageChange', { 
        detail: { language: locale, timestamp: Date.now() } 
      });
      window.dispatchEvent(event);
    }
  }, [locale]);
  
  const filteredMessages = selectedTab === 'all' 
    ? messages 
    : messages.filter(msg => !msg.read);
  
  // 获取消息样式
  const getMessageStyle = (type: Message['type']) => {
    switch (type) {
      case 'payment':
        return { icon: <Bell size={16} />, bgColor: "bg-green-900/30", textColor: "text-green-400" };
      case 'security':
        return { icon: <Bell size={16} />, bgColor: "bg-red-900/30", textColor: "text-red-400" };
      case 'system':
        return { icon: <Bell size={16} />, bgColor: "bg-purple-900/30", textColor: "text-purple-400" };
      default:
        return { icon: <Bell size={16} />, bgColor: "bg-blue-900/30", textColor: "text-blue-400" };
    }
  };

  // 使用模块特定的工具函数格式化日期
  const formatDate = useCallback((timestamp: string) => {
    // 确保使用当前语言环境
    return getRelativeNotificationTime(timestamp, locale || language as LanguageCode);
  }, [language, locale]);

  // 渲染分页项目
  const renderPaginationItems = () => {
    const items = [];
    const { totalPages } = pagination;
    
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              goToPage(i);
            }}
            className="notification_pagination_link_3a4f"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <PageLayout
      title={<TranslatedText keyName="notification.title" fallback="Notifications" />}
      subtitle={<TranslatedText keyName="notification.description" fallback="View all system notifications and alerts" />}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <Button 
            variant={selectedTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setSelectedTab('all')}
            className="notification_all_tab_button_3a4f"
          >
            <TranslatedText keyName="notification.allMessages" fallback="All Messages" />
          </Button>
          <Button 
            variant={selectedTab === 'unread' ? 'default' : 'outline'} 
            onClick={() => setSelectedTab('unread')}
            className="notification_unread_tab_button_3a4f"
          >
            <TranslatedText keyName="notification.unreadMessages" fallback="Unread Messages" />
          </Button>
        </div>
        
        <Button 
          variant="outline"
          onClick={markAllAsRead}
          className="notification_mark_all_button_3a4f flex items-center gap-2"
        >
          <CheckCheck size={16} />
          <TranslatedText keyName="notification.markAllAsRead" fallback="Mark All as Read" />
        </Button>
      </div>
      
      {/* 消息卡片 */}
      <Card className="notification_card_3a4f border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5 text-purple-400" />
            <TranslatedText keyName="notification.messageList" fallback="Message List" />
            {loading && <Badge variant="outline" className="ml-2">
              <TranslatedText keyName="notification.loading" fallback="Loading..." />
            </Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            // 加载状态显示骨架屏
            <div className="notification_loading_skeleton_3a4f space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className="animate-pulse flex items-start gap-3 p-4 rounded-lg bg-charcoal-dark/50"
                >
                  <div className="h-10 w-10 rounded-md bg-purple-900/50"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-purple-900/40 w-1/3 mb-2 rounded"></div>
                    <div className="h-4 bg-purple-900/30 w-full mb-2 rounded"></div>
                    <div className="h-4 bg-purple-900/20 w-2/3 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMessages.length > 0 ? (
            // 有消息时显示消息列表
            <>
              <div className="notification_messages_list_3a4f divide-y divide-purple-900/20">
                {filteredMessages.map((message) => {
                  const { icon, bgColor, textColor } = getMessageStyle(message.type);
                  return (
                    <div 
                      key={message.id}
                      className={`notification_message_item_3a4f py-4 px-3 flex gap-3 ${
                        !message.read ? 'bg-blue-950/50 border-l-2 border-blue-500' : ''
                      } hover:bg-charcoal-dark/40 transition-colors rounded-md`}
                    >
                      <div className={`${bgColor} ${textColor} p-2 h-fit rounded-md`}>{icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-white">
                            {message.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {!message.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                            <span className="text-xs text-gray-400">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {message.content}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <NotificationType 
                            type={message.type} 
                            className="notification_type_badge_3a4f"
                          />
                          
                          {/* 标记为已读按钮 */}
                          {!message.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="notification_mark_read_button_3a4f text-xs text-blue-400 hover:text-blue-300"
                              onClick={() => markAsRead(message.id)}
                            >
                              <Check size={14} className="mr-1" />
                              <TranslatedText keyName="notification.markAsRead" fallback="Mark as Read" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* 分页器 */}
              <div className="notification_pagination_container_3a4f mt-6">
                <Pagination className="notification_pagination_8c5d">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            goToPage(currentPage - 1);
                          }
                        }}
                        className={`notification_pagination_prev_5f2e ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      />
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < pagination.totalPages) {
                            goToPage(currentPage + 1);
                          }
                        }}
                        className={`notification_pagination_next_7b3a ${currentPage >= pagination.totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                
                <div className="text-center text-xs text-gray-400 mt-2">
                  <TranslatedText 
                    keyName="notification.pagination.info" 
                    fallback={`Page ${currentPage} of ${pagination.totalPages}, ${pagination.total} messages total`}
                    values={{
                      current: currentPage,
                      total: pagination.totalPages,
                      count: pagination.total
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            // 没有消息时的提示
            <div className="notification_empty_state_3a4f py-12 text-center">
              <p className="text-gray-400">
                <TranslatedText keyName="notification.noMessages" fallback="No Messages" />
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default NotificationsPage;
