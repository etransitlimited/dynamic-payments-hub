import translations from "@/translations";
import { LanguageCode } from '@/utils/languageUtils';

// Translation function with improved error handling and fallbacks
export const getTranslation = (key: string, language: LanguageCode): string => {
  try {
    // Check if the provided language exists
    if (!translations[language]) {
      console.warn(`Language "${language}" is not supported. Falling back to English.`);
      language = 'en';
    }

    // For empty keys, return an empty string
    if (!key) {
      return '';
    }
    
    console.log(`Getting translation for key: "${key}" in language: "${language}"`);
    
    // Improved common key handling
    const commonKeyMap: Record<string, string> = {
      'showing': 'common.showing',
      'of': 'common.of',
      'page': 'common.page',
      'records': 'common.records'
    };

    // Convert simple keys to full path if they exist in common key map
    if (commonKeyMap[key]) {
      key = commonKeyMap[key];
      console.log(`Mapped to full key: "${key}"`);
    }
    
    // Existing common key handlers remain the same
    if (key === 'common.id' || key === 'id') {
      if (language === 'en') return 'ID';
      if (language === 'fr') return 'ID';
      if (language === 'es') return 'ID';
      if (language === 'zh-CN') return 'ID';
      if (language === 'zh-TW') return 'ID';
      return 'ID'; // Fallback
    }
    
    if (key === 'common.all' || key === 'all') {
      if (language === 'en') return 'All';
      if (language === 'fr') return 'Tout';
      if (language === 'es') return 'Todos';
      if (language === 'zh-CN') return '全部';
      if (language === 'zh-TW') return '全部';
      return 'All'; // Fallback
    }
    
    if (key === 'common.of' || key === 'of') {
      if (language === 'en') return 'of';
      if (language === 'fr') return 'de';
      if (language === 'es') return 'de';
      if (language === 'zh-CN') return '共';
      if (language === 'zh-TW') return '共';
      return 'of'; // Fallback
    }
    
    if (key === 'common.actions' || key === 'actions') {
      if (language === 'en') return 'Actions';
      if (language === 'fr') return 'Actions';
      if (language === 'es') return 'Acciones';
      if (language === 'zh-CN') return '操作';
      if (language === 'zh-TW') return '操作';
      return 'Actions'; // Fallback
    }
    
    if (key === 'common.search' || key === 'search') {
      if (language === 'en') return 'Search';
      if (language === 'fr') return 'Rechercher';
      if (language === 'es') return 'Buscar';
      if (language === 'zh-CN') return '搜索';
      if (language === 'zh-TW') return '搜尋';
      return 'Search'; // Fallback
    }
    
    if (key === 'common.filter' || key === 'filter') {
      if (language === 'en') return 'Filter';
      if (language === 'fr') return 'Filtrer';
      if (language === 'es') return 'Filtrar';
      if (language === 'zh-CN') return '筛选';
      if (language === 'zh-TW') return '篩選';
      return 'Filter'; // Fallback
    }
    
    if (key === 'common.export' || key === 'export') {
      if (language === 'en') return 'Export';
      if (language === 'fr') return 'Exporter';
      if (language === 'es') return 'Exportar';
      if (language === 'zh-CN') return '导出';
      if (language === 'zh-TW') return '導出';
      return 'Export'; // Fallback
    }
    
    if (key === 'common.refresh' || key === 'refresh') {
      if (language === 'en') return 'Refresh';
      if (language === 'fr') return 'Actualiser';
      if (language === 'es') return 'Actualizar';
      if (language === 'zh-CN') return '刷新';
      if (language === 'zh-TW') return '重新整理';
      return 'Refresh'; // Fallback
    }
    
    if (key === 'common.details' || key === 'details') {
      if (language === 'en') return 'Details';
      if (language === 'fr') return 'Détails';
      if (language === 'es') return 'Detalles';
      if (language === 'zh-CN') return '详情';
      if (language === 'zh-TW') return '詳情';
      return 'Details'; // Fallback
    }
    
    if (key === 'common.save' || key === 'save') {
      if (language === 'en') return 'Save';
      if (language === 'fr') return 'Enregistrer';
      if (language === 'es') return 'Guardar';
      if (language === 'zh-CN') return '保存';
      if (language === 'zh-TW') return '儲存';
      return 'Save'; // Fallback
    }
    
    if (key === 'common.cancel' || key === 'cancel') {
      if (language === 'en') return 'Cancel';
      if (language === 'fr') return 'Annuler';
      if (language === 'es') return 'Cancelar';
      if (language === 'zh-CN') return '取消';
      if (language === 'zh-TW') return '取消';
      return 'Cancel'; // Fallback
    }
    
    if (key === 'common.submit' || key === 'submit') {
      if (language === 'en') return 'Submit';
      if (language === 'fr') return 'Soumettre';
      if (language === 'es') return 'Enviar';
      if (language === 'zh-CN') return '提交';
      if (language === 'zh-TW') return '提交';
      return 'Submit'; // Fallback
    }
    
    if (key === 'common.edit' || key === 'edit') {
      if (language === 'en') return 'Edit';
      if (language === 'fr') return 'Modifier';
      if (language === 'es') return 'Editar';
      if (language === 'zh-CN') return '编辑';
      if (language === 'zh-TW') return '編輯';
      return 'Edit'; // Fallback
    }
    
    if (key === 'common.delete' || key === 'delete') {
      if (language === 'en') return 'Delete';
      if (language === 'fr') return 'Supprimer';
      if (language === 'es') return 'Eliminar';
      if (language === 'zh-CN') return '删除';
      if (language === 'zh-TW') return '刪除';
      return 'Delete'; // Fallback
    }
    
    if (key === 'common.view' || key === 'view') {
      if (language === 'en') return 'View';
      if (language === 'fr') return 'Voir';
      if (language === 'es') return 'Ver';
      if (language === 'zh-CN') return '查看';
      if (language === 'zh-TW') return '查看';
      return 'View'; // Fallback
    }
    
    if (key === 'common.noData' || key === 'noData') {
      if (language === 'en') return 'No data';
      if (language === 'fr') return 'Aucune donnée';
      if (language === 'es') return 'Sin datos';
      if (language === 'zh-CN') return '暂无数据';
      if (language === 'zh-TW') return '暫無數據';
      return 'No data'; // Fallback
    }
    
    if (key === 'common.page' || key === 'page') {
      if (language === 'en') return 'Page';
      if (language === 'fr') return 'Page';
      if (language === 'es') return 'Página';
      if (language === 'zh-CN') return '页码';
      if (language === 'zh-TW') return '頁碼';
      return 'Page'; // Fallback
    }
    
    if (key === 'common.records' || key === 'records') {
      if (language === 'en') return 'Records';
      if (language === 'fr') return 'Enregistrements';
      if (language === 'es') return 'Registros';
      if (language === 'zh-CN') return '记录';
      if (language === 'zh-TW') return '記錄';
      return 'Records'; // Fallback
    }
    
    if (key === 'common.inviteeList' || key === 'inviteeList') {
      if (language === 'en') return 'Invitee List';
      if (language === 'fr') return 'Liste des Invités';
      if (language === 'es') return 'Lista de Invitados';
      if (language === 'zh-CN') return '邀请列表';
      if (language === 'zh-TW') return '邀請列表';
      return 'Invitee List'; // Fallback
    }
    
    if (key === 'common.status' || key === 'status') {
      if (language === 'en') return 'Status';
      if (language === 'fr') return 'Statut';
      if (language === 'es') return 'Estado';
      if (language === 'zh-CN') return '状态';
      if (language === 'zh-TW') return '狀態';
      return 'Status'; // Fallback
    }
    
    if (key === 'common.date' || key === 'date') {
      if (language === 'en') return 'Date';
      if (language === 'fr') return 'Date';
      if (language === 'es') return 'Fecha';
      if (language === 'zh-CN') return '日期';
      if (language === 'zh-TW') return '日期';
      return 'Date'; // Fallback
    }
    
    if (key === 'common.amount' || key === 'amount') {
      if (language === 'en') return 'Amount';
      if (language === 'fr') return 'Montant';
      if (language === 'es') return 'Monto';
      if (language === 'zh-CN') return '金额';
      if (language === 'zh-TW') return '金額';
      return 'Amount'; // Fallback
    }
    
    // Enhanced nested object handling
    if (key.includes('.')) {
      const parts = key.split('.');
      let value: any = translations[language];
      
      // Navigate through nested objects
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          // Improved fallback mechanism
          console.warn(`Translation key not found: "${key}" in language "${language}". Attempting English fallback.`);
          
          // Try English fallback
          let fallbackValue: any = translations['en'];
          let fallbackFound = true;
          
          for (const fallbackPart of parts) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackPart in fallbackValue) {
              fallbackValue = fallbackValue[fallbackPart];
            } else {
              fallbackFound = false;
              break;
            }
          }
          
          if (fallbackFound && (typeof fallbackValue === 'string' || typeof fallbackValue === 'number')) {
            console.warn(`Using English fallback for key: "${key}"`);
            return String(fallbackValue);
          }
          
          // If no fallback found, return the original key
          return key;
        }
      }
      
      // Return string value or fallback
      return typeof value === 'string' || typeof value === 'number' ? String(value) : key;
    }
    
    // Fallback for top-level keys
    const directValue = translations[language][key];
    if (directValue) {
      return String(directValue);
    }
    
    console.warn(`Translation key not found: "${key}" in language "${language}"`);
    return key;
  } catch (error) {
    console.error(`Error in translation function for key "${key}":`, error);
    return key;
  }
};
