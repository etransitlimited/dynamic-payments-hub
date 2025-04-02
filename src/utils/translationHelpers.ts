
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
  
  // Fix missing translations for cards search
  if (key === "cards.activationTasks.searchTasks") {
    switch (language) {
      case 'zh-CN': return "搜索任务";
      case 'zh-TW': return "搜尋任務";
      case 'fr': return "Rechercher des Tâches";
      case 'es': return "Buscar Tareas";
      default: return "Search Tasks";
    }
  }
  
  if (key === "cards.activationTasks.filterByStatus") {
    switch (language) {
      case 'zh-CN': return "按状态筛选";
      case 'zh-TW': return "按狀態篩選";
      case 'fr': return "Filtrer par Statut";
      case 'es': return "Filtrar por Estado";
      default: return "Filter by Status";
    }
  }
  
  // Card types
  if (key === "cards.types.credit") {
    switch (language) {
      case 'zh-CN': return "信用卡";
      case 'zh-TW': return "信用卡";
      case 'fr': return "Cartes de Crédit";
      case 'es': return "Tarjetas de Crédito";
      default: return "Credit Cards";
    }
  }
  
  if (key === "cards.types.debit") {
    switch (language) {
      case 'zh-CN': return "借记卡";
      case 'zh-TW': return "借記卡";
      case 'fr': return "Cartes de Débit";
      case 'es': return "Tarjetas de Débito";
      default: return "Debit Cards";
    }
  }
  
  // Account role translations
  if (key.startsWith('accountRoles.')) {
    const roleKey = key.split('.')[1];
    
    switch (roleKey) {
      case 'cardAccessManagement':
        switch (language) {
          case 'zh-CN': return "卡片访问管理";
          case 'zh-TW': return "卡片訪問管理";
          case 'fr': return "Gestion d'Accès aux Cartes";
          case 'es': return "Gestión de Acceso a Tarjetas";
          default: return "Card Access Management";
        }
      case 'cardAccessDesc':
        switch (language) {
          case 'zh-CN': return "管理卡片访问权限";
          case 'zh-TW': return "管理卡片訪問權限";
          case 'fr': return "Gérer les accès aux cartes";
          case 'es': return "Gestionar acceso a tarjetas";
          default: return "Manage card access permissions";
        }
      case 'cardActivation':
        switch (language) {
          case 'zh-CN': return "卡片激活";
          case 'zh-TW': return "卡片激活";
          case 'fr': return "Activation de Carte";
          case 'es': return "Activación de Tarjeta";
          default: return "Card Activation";
        }
      case 'cardSettings':
        switch (language) {
          case 'zh-CN': return "卡片设置";
          case 'zh-TW': return "卡片設置";
          case 'fr': return "Paramètres de Carte";
          case 'es': return "Configuración de Tarjeta";
          default: return "Card Settings";
        }
      case 'dashboardAccess':
        switch (language) {
          case 'zh-CN': return "仪表盘访问";
          case 'zh-TW': return "儀表板訪問";
          case 'fr': return "Accès au Tableau de Bord";
          case 'es': return "Acceso al Panel";
          default: return "Dashboard Access";
        }
      default:
        return fallback;
    }
  }
  
  return fallback;
};
