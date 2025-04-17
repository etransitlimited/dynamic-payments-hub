
import { NavigateFunction } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";

/**
 * 安全导航工具，保持认证状态
 */
export const safeNavigate = (
  navigate: NavigateFunction,
  path: string, 
  options?: { replace?: boolean }
) => {
  // 确保在导航前保存令牌
  const currentToken = localStorage.getItem('authToken');
  if (currentToken) {
    // 在导航前将令牌备份到sessionStorage
    sessionStorage.setItem('tempAuthToken', currentToken);
  }
  
  // 检查路径是否包含语言前缀
  const hasLanguagePrefix = /^\/(en|zh-CN|zh-TW|fr|es)\//.test(path);
  
  // 如果没有语言前缀，尝试添加当前语言
  if (!hasLanguagePrefix && path.startsWith('/dashboard')) {
    // 获取当前语言
    const language = localStorage.getItem('language') || 'en';
    
    // 构建新路径 (如果路径以/开头，则去掉第一个斜杠以避免双斜杠)
    const newPath = `/${language}${path.startsWith('/') ? path : `/${path}`}`;
    
    console.log(`safeNavigate: Adding language prefix to path: ${path} -> ${newPath}`);
    path = newPath;
  }
  
  // 在页面内容变更前添加视觉过渡
  document.querySelector('main')?.classList.add('page-transitioning');
  
  // 执行客户端导航
  navigate(path, options);
  
  // 导航完成后移除过渡类
  setTimeout(() => {
    document.querySelector('main')?.classList.remove('page-transitioning');
  }, 300);
};

/**
 * 初始化认证令牌保护
 * 在应用启动时调用此函数以确保令牌在页面刷新后保持不变
 */
export const initAuthTokenProtection = () => {
  // 恢复从sessionStorage到localStorage的令牌
  const sessionToken = sessionStorage.getItem('tempAuthToken');
  const localToken = localStorage.getItem('authToken');
  
  // 如果sessionStorage中有令牌但localStorage中没有，则恢复它
  if (sessionToken && !localToken) {
    console.log("Auth: Restoring token from session storage on init");
    localStorage.setItem('authToken', sessionToken);
    
    // 触发认证状态更改事件
    window.dispatchEvent(new CustomEvent('auth:statusChange', { 
      detail: { status: 'authenticated' } 
    }));
  }
  
  // 为令牌变化添加事件侦听器
  window.addEventListener('storage', (e) => {
    if (e.key === 'authToken') {
      // 同步令牌变化
      if (e.newValue) {
        sessionStorage.setItem('tempAuthToken', e.newValue);
      } else {
        // 令牌被清除
        sessionStorage.removeItem('tempAuthToken');
      }
    }
  });
  
  // 添加语言变化监听器以确保令牌持久化
  window.addEventListener('app:languageChange', (e) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log("Auth: Preserving token during language change event");
      sessionStorage.setItem('tempAuthToken', token);
    }
  });
};
