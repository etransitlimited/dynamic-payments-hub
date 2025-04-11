
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
}

export const useAuth = (): AuthState & { 
  logout: () => void; 
  login: (token: string) => void;
  forceRefresh: () => void;
} => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });
  
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const mountedRef = useRef(true);
  const checkInProgressRef = useRef(false);
  const lastRefreshTimeRef = useRef(0);
  const languageRef = useRef(language);
  const refreshThrottleMs = 500;
  const stableTokenRef = useRef<string | null>(null);
  const initialTokenLoadedRef = useRef(false);
  const languageStabilityWaitPeriod = 2500; // 增加到2500ms

  // 带去抖动的检查认证状态功能
  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      // 始终首先检查localStorage，然后使用缓存值
      const token = localStorage.getItem('authToken') || stableTokenRef.current;
      
      // 将令牌存储在内存中以防止丢失
      if (token) {
        stableTokenRef.current = token;
        initialTokenLoadedRef.current = true;
      }
      
      console.log("认证检查: Token存在:", !!token);
      
      if (token && mountedRef.current) {
        // 当令牌存在时，将isLoggedIn设置为true
        setState(prev => {
          // 仅当有变化时更新以防止不必要的渲染
          if (!prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: true,
              isLoading: false,
              user: { 
                id: '1', 
                name: 'Test User', 
                email: 'test@example.com' 
              },
            };
          }
          return prev;
        });
        
        // 确保令牌存储在localStorage中
        if (token !== localStorage.getItem('authToken')) {
          localStorage.setItem('authToken', token);
        }
        
        // 也存储在sessionStorage中作为备份
        sessionStorage.setItem('tempAuthToken', token);
        
        checkInProgressRef.current = false;
        return true;
      } else if (mountedRef.current) {
        // 当未找到令牌时，清除状态
        setState(prev => {
          // 仅当有变化时更新
          if (prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: false,
              isLoading: false,
              user: null,
            };
          }
          return prev;
        });
        checkInProgressRef.current = false;
        return false;
      }
    } catch (error) {
      console.error("认证检查失败，错误:", error);
      if (mountedRef.current) {
        setState(prev => {
          if (prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: false,
              isLoading: false,
              user: null,
            };
          }
          return prev;
        });
      }
    }
    
    checkInProgressRef.current = false;
    return false;
  }, []);

  // 强制刷新认证状态（带节流）
  const forceRefresh = useCallback(() => {
    if (!mountedRef.current) return;
    
    const now = Date.now();
    if (now - lastRefreshTimeRef.current < refreshThrottleMs) {
      console.log("认证刷新被节流，跳过...");
      return;
    }
    
    console.log("强制刷新认证状态...");
    lastRefreshTimeRef.current = now;
    
    setState(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 100);
  }, [checkAuth]);

  // 增强的登出功能
  const logout = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log("用户登出 - 移除认证token");
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('tempAuthToken');
    stableTokenRef.current = null;
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
  }, []);

  // 添加登录功能
  const login = useCallback((token: string) => {
    if (!mountedRef.current) return;
    
    console.log("登录: 设置认证token", token);
    localStorage.setItem('authToken', token);
    sessionStorage.setItem('tempAuthToken', token);
    stableTokenRef.current = token;
    setState({
      isLoggedIn: true,
      isLoading: false,
      user: { 
        id: '1', 
        name: 'Test User', 
        email: 'test@example.com' 
      },
    });
  }, []);

  // 跟踪组件挂载状态
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 关键修复：更强大的语言变更处理
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`认证: 语言从${languageRef.current}变为${language}，保留认证状态`);
      languageRef.current = language;
      
      // 在语言变更期间立即保存令牌以防止丢失
      if (stableTokenRef.current) {
        console.log("认证: 在语言变更期间保留token");
        sessionStorage.setItem('tempAuthToken', stableTokenRef.current);
      } else {
        // 检查localStorage是否有token
        const token = localStorage.getItem('authToken');
        if (token) {
          stableTokenRef.current = token;
          sessionStorage.setItem('tempAuthToken', token);
        }
      }
      
      // 语言变更后重新检查认证状态（带小延迟以避免冲突）
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          // 首先尝试从会话存储恢复
          const tempToken = sessionStorage.getItem('tempAuthToken');
          if (tempToken) {
            console.log("认证: 在语言变更后从会话存储恢复token");
            localStorage.setItem('authToken', tempToken);
            stableTokenRef.current = tempToken;
          }
          
          // 然后检查认证状态
          checkAuth();
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [language, checkAuth]);

  // 当语言变更时，将认证令牌保存到会话存储
  useEffect(() => {
    if (isChangingLanguage) {
      console.log("认证: 语言正在变更，保留认证token");
      const token = localStorage.getItem('authToken') || stableTokenRef.current;
      if (token) {
        sessionStorage.setItem('tempAuthToken', token);
      }
    } else if (!isChangingLanguage && sessionStorage.getItem('tempAuthToken')) {
      console.log("认证: 语言变更完成，恢复认证token");
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        localStorage.setItem('authToken', tempToken);
        stableTokenRef.current = tempToken;
        
        if (state.isLoggedIn === false) {
          setState({
            isLoggedIn: true,
            isLoading: false,
            user: { 
              id: '1', 
              name: 'Test User', 
              email: 'test@example.com' 
            },
          });
        }
      }
    }
  }, [isChangingLanguage, state.isLoggedIn]);

  // 挂载时检查认证状态
  useEffect(() => {
    // 组件挂载时首先尝试从localStorage加载令牌
    if (!initialTokenLoadedRef.current) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        stableTokenRef.current = storedToken;
        // 同时保存到sessionStorage作为备份
        sessionStorage.setItem('tempAuthToken', storedToken);
        initialTokenLoadedRef.current = true;
      } else {
        // 尝试从sessionStorage恢复（用于语言切换情况）
        const sessionToken = sessionStorage.getItem('tempAuthToken');
        if (sessionToken) {
          console.log("认证: 从会话存储恢复token");
          localStorage.setItem('authToken', sessionToken);
          stableTokenRef.current = sessionToken;
          initialTokenLoadedRef.current = true;
        }
      }
    }
    
    // 小超时以确保组件完全挂载
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 100);
    
    // 监听存储变化以检测跨标签页认证变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && mountedRef.current) {
        console.log("认证token在另一个标签页中更改，刷新状态");
        stableTokenRef.current = e.newValue;
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
    };
  }, [checkAuth]);

  return { ...state, logout, login, forceRefresh };
};
