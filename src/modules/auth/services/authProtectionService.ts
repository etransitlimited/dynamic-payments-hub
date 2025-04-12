
import { initAuthProtection } from "@/utils/authNavigationUtils";

/**
 * 初始化认证保护服务
 * - 在页面加载时自动启动
 * - 在语言切换时保护token
 * - 在路由导航时保护token
 * - 提供双TOKEN存储机制
 */
let cleanup: (() => void) | null = null;

export const startAuthProtectionService = () => {
  // 避免多次初始化
  if (cleanup) {
    return;
  }
  
  console.log("[AuthProtection] Starting protection service...");
  
  // 初始化双TOKEN保护系统
  cleanup = initAuthProtection();
  
  // 在卸载或页面刷新前确保保存token
  window.addEventListener('beforeunload', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      sessionStorage.setItem('tempAuthToken', token);
      console.log("[AuthProtection] Token saved to session storage before page unload");
    }
  });
  
  console.log("[AuthProtection] Protection service started successfully");
};

export const stopAuthProtectionService = () => {
  if (cleanup) {
    cleanup();
    cleanup = null;
    console.log("[AuthProtection] Protection service stopped");
  }
};

// 自动启动保护服务（导入时）
startAuthProtectionService();

// 导出用于全局使用的功能
export default {
  start: startAuthProtectionService,
  stop: stopAuthProtectionService,
};
