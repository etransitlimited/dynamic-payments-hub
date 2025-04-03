
import { LanguageCode } from "@/utils/languageUtils";

/**
 * Utility function to get direct translations for specific text based on language
 * This reduces reliance on context updates for dynamic translations
 */
export const getDirectTranslation = (
  key: string, 
  language: LanguageCode, 
  fallback: string = ""
): string => {
  // Common transaction-related translations
  if (key === "transactions.deposit") {
    switch (language) {
      case 'zh-CN': return "存款";
      case 'zh-TW': return "存款";
      case 'fr': return "Dépôt";
      case 'es': return "Depósito";
      default: return "Deposit";
    }
  }
  
  if (key === "transactions.withdrawal") {
    switch (language) {
      case 'zh-CN': return "取款";
      case 'zh-TW': return "取款";
      case 'fr': return "Retrait";
      case 'es': return "Retiro";
      default: return "Withdrawal";
    }
  }
  
  if (key === "transactions.transfer") {
    switch (language) {
      case 'zh-CN': return "转账";
      case 'zh-TW': return "轉賬";
      case 'fr': return "Transfert";
      case 'es': return "Transferencia";
      default: return "Transfer";
    }
  }
  
  if (key === "transactions.payment") {
    switch (language) {
      case 'zh-CN': return "支付";
      case 'zh-TW': return "支付";
      case 'fr': return "Paiement";
      case 'es': return "Pago";
      default: return "Payment";
    }
  }
  
  if (key === "transactions.exchange") {
    switch (language) {
      case 'zh-CN': return "兑换";
      case 'zh-TW': return "兌換";
      case 'fr': return "Échange";
      case 'es': return "Cambio";
      default: return "Exchange";
    }
  }
  
  if (key === "transactions.expense") {
    switch (language) {
      case 'zh-CN': return "支出";
      case 'zh-TW': return "支出";
      case 'fr': return "Dépense";
      case 'es': return "Gasto";
      default: return "Expense";
    }
  }
  
  if (key === "transactions.statusCompleted") {
    switch (language) {
      case 'zh-CN': return "已完成";
      case 'zh-TW': return "已完成";
      case 'fr': return "Terminée";
      case 'es': return "Completada";
      default: return "Completed";
    }
  }
  
  if (key === "transactions.statusPending") {
    switch (language) {
      case 'zh-CN': return "处理中";
      case 'zh-TW': return "處理中";
      case 'fr': return "En Attente";
      case 'es': return "Pendiente";
      default: return "Pending";
    }
  }
  
  if (key === "transactions.statusFailed") {
    switch (language) {
      case 'zh-CN': return "失败";
      case 'zh-TW': return "失敗";
      case 'fr': return "Échouée";
      case 'es': return "Fallida";
      default: return "Failed";
    }
  }
  
  return fallback;
};
