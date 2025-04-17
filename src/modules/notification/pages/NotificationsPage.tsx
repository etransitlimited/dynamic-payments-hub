
import React, { useState, useEffect } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMessages, Message } from "@/services/messageService";
import { LanguageCode, formatLocalizedDateTime } from "@/utils/languageUtils";
import PageLayout from "@/components/dashboard/PageLayout";
import TranslatedText from "@/components/translation/TranslatedText";
import NotificationType from "../components/NotificationType";
import { useLanguage } from "@/context/LanguageContext"; // Add this import
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface NotificationsPageProps {
  currentLanguage?: LanguageCode;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ 
  currentLanguage = "zh-CN" as LanguageCode 
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
  
  const filteredMessages = selectedTab === 'all' 
    ? messages 
    : messages.filter(msg => !msg.read);
  
  // 根据消息类型获取图标和颜色
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

  // 格式化日期
  const formatDate = (timestamp: string) => {
    return formatLocalizedDateTime(timestamp, language as LanguageCode);
  };

  // 生成分页链接
  const renderPaginationItems = () => {
    const items = [];
    const { totalPages } = pagination;
    
    // 显示最多5个页码按钮
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
      title={<TranslatedText keyName="notification.title" fallback="消息通知" />}
      subtitle={<TranslatedText keyName="notification.description" fallback="查看所有系统通知" />}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <Button 
            variant={selectedTab === 'all' ? 'default' : 'outline'} 
            onClick={() => setSelectedTab('all')}
          >
            <TranslatedText keyName="notification.allMessages" fallback="所有消息" />
          </Button>
          <Button 
            variant={selectedTab === 'unread' ? 'default' : 'outline'} 
            onClick={() => setSelectedTab('unread')}
          >
            <TranslatedText keyName="notification.unreadMessages" fallback="未读消息" />
          </Button>
        </div>
        
        <Button 
          variant="outline"
          onClick={markAllAsRead}
          className="flex items-center gap-2"
        >
          <CheckCheck size={16} />
          <TranslatedText keyName="notification.markAllAsRead" fallback="全部标记为已读" />
        </Button>
      </div>
      
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5 text-purple-400" />
            <TranslatedText keyName="notification.messageList" fallback="消息列表" />
            {loading && <Badge variant="outline" className="ml-2">
              <TranslatedText keyName="common.loading" fallback="加载中..." />
            </Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
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
            <>
              <div className="divide-y divide-purple-900/20">
                {filteredMessages.map((message) => {
                  const { icon, bgColor, textColor } = getMessageStyle(message.type);
                  return (
                    <div 
                      key={message.id}
                      className={`py-4 px-3 flex gap-3 ${
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
                          <NotificationType type={message.type} />
                          
                          {!message.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-blue-400 hover:text-blue-300"
                              onClick={() => markAsRead(message.id)}
                            >
                              <Check size={14} className="mr-1" />
                              <TranslatedText keyName="notification.markAsRead" fallback="标记为已读" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* 分页控件 */}
              <div className="mt-6">
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
                    fallback={`第 ${currentPage} 页，共 ${pagination.totalPages} 页，总计 ${pagination.total} 条消息`}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-400">
                <TranslatedText keyName="notification.noMessages" fallback="没有消息" />
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default NotificationsPage;
