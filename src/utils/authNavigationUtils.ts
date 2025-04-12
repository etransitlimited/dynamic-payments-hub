
import { NavigateFunction } from 'react-router-dom';

/**
 * 安全导航工具 - 在页面导航时保存和恢复认证状态
 * @param navigate - React Router的navigate函数
 * @param path - 目标路径
 * @param options - 导航选项
 */
export const safeNavigate = (
  navigate: NavigateFunction, 
  path: string, 
  options?: { 
    transitionDuration?: number;
    addFeedback?: boolean;
    preserveAuth?: boolean;
  }
) => {
  const { 
    transitionDuration = 300,
    addFeedback = true,
    preserveAuth = true
  } = options || {};
  
  // 检查是否已经在目标路径
  if (window.location.pathname === path) {
    return;
  }
  
  // 保存认证状态到sessionStorage
  if (preserveAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Navigation: Saving token backup to sessionStorage');
      sessionStorage.setItem('tempAuthToken', token);
    }
  }
  
  // 添加视觉过渡效果
  if (addFeedback) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      // 添加过渡类
      mainContent.classList.add('page-transitioning');
      
      // 子内容的过渡效果
      const contentElement = mainContent.querySelector('.dashboard-content');
      if (contentElement) {
        contentElement.classList.add('page-changing');
      }
    }
  }
  
  // 导航到新路径
  navigate(path);
  
  // 恢复认证状态 (如果localStorage中的token丢失)
  if (preserveAuth) {
    const backupToken = sessionStorage.getItem('tempAuthToken');
    if (!localStorage.getItem('authToken') && backupToken) {
      console.log('Navigation: Restoring token from sessionStorage');
      localStorage.setItem('authToken', backupToken);
    }
  }
  
  // 移除过渡效果
  setTimeout(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.remove('page-transitioning');
      
      const contentElement = mainContent.querySelector('.dashboard-content');
      if (contentElement) {
        contentElement.classList.remove('page-changing');
      }
    }
  }, transitionDuration);
};

/**
 * 监听身份验证状态变化
 * 确保在语言切换或路由变化时不会丢失token
 */
export const setupAuthListener = () => {
  // 在页面加载和卸载时检查token
  const checkAndRestoreToken = () => {
    const backupToken = sessionStorage.getItem('tempAuthToken');
    const currentToken = localStorage.getItem('authToken');
    
    if (!currentToken && backupToken) {
      console.log('AuthListener: Restoring token from session storage');
      localStorage.setItem('authToken', backupToken);
    } else if (currentToken && !backupToken) {
      console.log('AuthListener: Backing up token to session storage');
      sessionStorage.setItem('tempAuthToken', currentToken);
    }
  };
  
  // 定期检查token
  const intervalId = setInterval(checkAndRestoreToken, 2000);
  
  // 页面切换时检查
  window.addEventListener('beforeunload', checkAndRestoreToken);
  
  // 返回清理函数
  return () => {
    clearInterval(intervalId);
    window.removeEventListener('beforeunload', checkAndRestoreToken);
  };
};

/**
 * 在全局初始化认证保护系统
 */
export const initAuthProtection = () => {
  // 检查token是否需要从sessionStorage恢复
  const backupToken = sessionStorage.getItem('tempAuthToken');
  if (backupToken && !localStorage.getItem('authToken')) {
    console.log('AuthProtection: Restoring auth token from session storage');
    localStorage.setItem('authToken', backupToken);
  }
  
  // 设置双向同步机制
  setupAuthListener();
  
  // 监听语言变化事件
  const handleLanguageChange = () => {
    const currentToken = localStorage.getItem('authToken');
    if (currentToken) {
      console.log('AuthProtection: Language changing, backing up token');
      sessionStorage.setItem('tempAuthToken', currentToken);
    }
  };
  
  window.addEventListener('app:languageChange', handleLanguageChange);
  document.addEventListener('languageChanged', handleLanguageChange);
  
  // 返回清理函数
  return () => {
    window.removeEventListener('app:languageChange', handleLanguageChange);
    document.removeEventListener('languageChanged', handleLanguageChange);
  };
};
