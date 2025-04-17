
import { get, post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { Message } from "@/services/messageService";
import { LanguageCode } from "@/utils/languageUtils";

// Notification module API
export const message_api_get = async (lang: LanguageCode, limit: number = 10): Promise<Message[]> => {
  try {
    // Ensure auth token is restored if needed
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    if (token && !localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', token);
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Language-specific mock messages
    const mockMessages: Record<string, Message[]> = {
      "en": [
        { id: "1", title: "System Maintenance", content: "System will undergo maintenance from 22:00 to 02:00.", timestamp: "2025-04-10T22:00:00", read: false, type: "system" },
        { id: "2", title: "Payment Success", content: "Your payment of $500 has been processed successfully.", timestamp: "2025-04-09T14:30:00", read: true, type: "payment" },
        { id: "3", title: "Security Alert", content: "A new device was used to log in to your account.", timestamp: "2025-04-08T09:15:00", read: false, type: "security" },
        { id: "4", title: "Card Activation", content: "Your virtual card has been activated and is ready to use.", timestamp: "2025-04-07T16:45:00", read: true, type: "notification" }
      ],
      "zh-CN": [
        { id: "1", title: "系统维护", content: "系统将于22:00至02:00进行维护。", timestamp: "2025-04-10T22:00:00", read: false, type: "system" },
        { id: "2", title: "支付成功", content: "您的500元支付已成功处理。", timestamp: "2025-04-09T14:30:00", read: true, type: "payment" },
        { id: "3", title: "安全提醒", content: "检测到新设备登录您的账户。", timestamp: "2025-04-08T09:15:00", read: false, type: "security" },
        { id: "4", title: "卡片激活", content: "您的虚拟卡已激活，可以使用了。", timestamp: "2025-04-07T16:45:00", read: true, type: "notification" }
      ],
      "fr": [
        { id: "1", title: "Maintenance du système", content: "Le système sera en maintenance de 22h00 à 02h00.", timestamp: "2025-04-10T22:00:00", read: false, type: "system" },
        { id: "2", title: "Paiement réussi", content: "Votre paiement de 500€ a été traité avec succès.", timestamp: "2025-04-09T14:30:00", read: true, type: "payment" },
        { id: "3", title: "Alerte de sécurité", content: "Un nouvel appareil a été utilisé pour se connecter à votre compte.", timestamp: "2025-04-08T09:15:00", read: false, type: "security" },
        { id: "4", title: "Activation de la carte", content: "Votre carte virtuelle a été activée et est prête à être utilisée.", timestamp: "2025-04-07T16:45:00", read: true, type: "notification" }
      ],
      "es": [
        { id: "1", title: "Mantenimiento del sistema", content: "El sistema estará en mantenimiento de 22:00 a 02:00.", timestamp: "2025-04-10T22:00:00", read: false, type: "system" },
        { id: "2", title: "Pago exitoso", content: "Su pago de $500 ha sido procesado con éxito.", timestamp: "2025-04-09T14:30:00", read: true, type: "payment" },
        { id: "3", title: "Alerta de seguridad", content: "Se utilizó un nuevo dispositivo para iniciar sesión en su cuenta.", timestamp: "2025-04-08T09:15:00", read: false, type: "security" },
        { id: "4", title: "Activación de tarjeta", content: "Su tarjeta virtual ha sido activada y está lista para usar.", timestamp: "2025-04-07T16:45:00", read: true, type: "notification" }
      ]
    };
    
    // Get messages for requested language or fallback to English
    const messages = mockMessages[lang] || mockMessages["en"];
    
    // Return messages limited by the requested count
    return messages.slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch messages, using fallback data:", error);
    return [];
  }
};

// Mark a single message as read
export const message_api_read = async (id: string): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  } catch (error) {
    console.error("Failed to mark message as read:", error);
    return false;
  }
};

// Mark all messages as read
export const message_api_readAll = async (): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  } catch (error) {
    console.error("Failed to mark all messages as read:", error);
    return false;
  }
};
