
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
  // Common UI elements translations
  if (key === "search.placeholder") {
    switch (language) {
      case 'zh-CN': return "搜索任务";
      case 'zh-TW': return "搜尋任務";
      case 'fr': return "Rechercher des Tâches";
      case 'es': return "Buscar Tareas";
      default: return "Search Tasks";
    }
  }
  
  if (key === "filter.status") {
    switch (language) {
      case 'zh-CN': return "按状态筛选";
      case 'zh-TW': return "按狀態篩選";
      case 'fr': return "Filtrer par Statut";
      case 'es': return "Filtrar por Estado";
      default: return "Filter by Status";
    }
  }
  
  if (key === "status.pending") {
    switch (language) {
      case 'zh-CN': return "待处理";
      case 'zh-TW': return "待處理";
      case 'fr': return "En Attente";
      case 'es': return "Pendiente";
      default: return "Pending";
    }
  }
  
  if (key === "status.completed") {
    switch (language) {
      case 'zh-CN': return "已完成";
      case 'zh-TW': return "已完成";
      case 'fr': return "Terminée";
      case 'es': return "Completada";
      default: return "Completed";
    }
  }
  
  if (key === "status.approved") {
    switch (language) {
      case 'zh-CN': return "已批准";
      case 'zh-TW': return "已批准";
      case 'fr': return "Approuvée";
      case 'es': return "Aprobada";
      default: return "Approved";
    }
  }
  
  if (key === "status.failed") {
    switch (language) {
      case 'zh-CN': return "失败";
      case 'zh-TW': return "失敗";
      case 'fr': return "Échouée";
      case 'es': return "Fallida";
      default: return "Failed";
    }
  }
  
  if (key === "status.rejected") {
    switch (language) {
      case 'zh-CN': return "已拒绝";
      case 'zh-TW': return "已拒絕";
      case 'fr': return "Rejetée";
      case 'es': return "Rechazada";
      default: return "Rejected";
    }
  }
  
  if (key === "filter.all") {
    switch (language) {
      case 'zh-CN': return "全部";
      case 'zh-TW': return "全部";
      case 'fr': return "Tous";
      case 'es': return "Todos";
      default: return "All";
    }
  }
  
  return fallback;
};
