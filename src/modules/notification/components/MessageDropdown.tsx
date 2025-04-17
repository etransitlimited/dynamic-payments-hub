
import React from "react";
import { Bell, Check, MailOpen, ChevronRight } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMessages, Message } from "@/services/messageService";
import { LanguageCode } from "@/utils/languageUtils";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import NotificationType from "./NotificationType";
import { getRelativeNotificationTime } from "../utils/notificationUtils";
import TranslatedText from "@/components/translation/TranslatedText";

interface MessageDropdownProps {
  locale: LanguageCode;
  version: "v1"|"v2";
}

const MessageItem = ({ 
  message, 
  onRead 
}: { 
  message: Message, 
  onRead: (id: string) => void 
}) => {
  const { language } = useLanguage();
  
  // Get icon based on message type
  const getIcon = () => {
    switch (message.type) {
      case 'payment':
        return <div className="notification_icon_payment_3a4f bg-green-900/30 text-green-400 p-1.5 rounded-md"><Bell size={16} /></div>;
      case 'security':
        return <div className="notification_icon_security_3a4f bg-red-900/30 text-red-400 p-1.5 rounded-md"><Bell size={16} /></div>;
      case 'system':
        return <div className="notification_icon_system_3a4f bg-purple-900/30 text-purple-400 p-1.5 rounded-md"><Bell size={16} /></div>;
      default:
        return <div className="notification_icon_default_3a4f bg-blue-900/30 text-blue-400 p-1.5 rounded-md"><Bell size={16} /></div>;
    }
  };

  return (
    <div 
      className={`notification_message_item_3a4f p-3 flex gap-3 ${
        !message.read ? 'bg-blue-950/50 border border-blue-900/20' : ''
      } rounded-md hover:bg-charcoal-dark/40 cursor-pointer transition-colors`}
      onClick={() => onRead(message.id)}
    >
      <div className="notification_icon_wrapper_3a4f">{getIcon()}</div>
      <div className="notification_content_3a4f flex-1">
        <div className="notification_title_3a4f flex items-center justify-between">
          <h4 className="notification_title_text_3a4f text-sm font-medium text-white">
            {message.title}
          </h4>
          {!message.read && (
            <span className="notification_unread_marker_3a4f w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </div>
        <p className="notification_message_3a4f text-xs text-gray-400 line-clamp-2 mt-1">
          {message.content}
        </p>
        <div className="flex justify-between items-center mt-1">
          <div className="notification_time_3a4f text-[10px] text-gray-500">
            {getRelativeNotificationTime(message.timestamp, language as LanguageCode)}
          </div>
          <NotificationType type={message.type} className="scale-75 origin-right" />
        </div>
      </div>
    </div>
  );
};

const MessageDropdown: React.FC<MessageDropdownProps> = ({ locale, version }) => {
  const { messages, loading, unreadCount, markAsRead, markAllAsRead } = useMessages(5);
  const { language } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="notification_trigger_3a4f relative text-purple-200 hover:bg-purple-600/20"
          data-language={language}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="notification_badge_3a4f absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="notification_dropdown_3a4f w-80 bg-charcoal-light/95 backdrop-blur-md border-purple-900/30 p-2 shadow-lg"
      >
        <div className="notification_header_3a4f flex items-center justify-between py-2 px-3">
          <DropdownMenuLabel className="notification_header_title_3a4f text-white font-medium p-0">
            <TranslatedText keyName="notification.title" fallback="通知" />
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="notification_mark_read_3a4f h-auto text-xs py-1 text-blue-400 hover:text-blue-300"
              onClick={markAllAsRead}
              data-language={language}
            >
              <Check size={12} className="mr-1" />
              <TranslatedText keyName="notification.markAllAsRead" fallback="全部标记为已读" />
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="notification_separator_3a4f bg-purple-900/20" />
        
        <div className="notification_messages_container_3a4f max-h-[300px] overflow-y-auto py-1 space-y-2">
          {loading ? (
            <div className="notification_loading_3a4f p-6 text-center text-sm text-gray-400">
              <TranslatedText keyName="notification.loading" fallback="加载中..." />
            </div>
          ) : messages.length === 0 ? (
            <div className="notification_empty_3a4f p-6 text-center text-sm text-gray-400">
              <TranslatedText keyName="notification.noMessages" fallback="没有消息" />
            </div>
          ) : (
            messages.map((message) => (
              <MessageItem 
                key={`notification-${message.id}-${locale}`} 
                message={message} 
                onRead={markAsRead} 
              />
            ))
          )}
        </div>
        
        <DropdownMenuSeparator className="notification_footer_separator_3a4f bg-purple-900/20" />
        <DropdownMenuItem 
          className="notification_view_all_3a4f py-2 text-center cursor-pointer flex justify-center items-center text-blue-400 hover:text-blue-300 hover:bg-blue-900/10"
          asChild
        >
          <Link to="/dashboard/notifications">
            <TranslatedText keyName="notification.viewAll" fallback="查看所有通知" />
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageDropdown;
