
import { initAuthTokenProtection } from "../utils/authNavigationUtils";

/**
 * 认证保护服务
 * 处理令牌在页面刷新和语言切换时的持久性
 */
class AuthProtectionService {
  private initialized = false;
  
  /**
   * 初始化认证保护
   * 在应用启动时调用
   */
  initialize() {
    if (this.initialized) return;
    
    // 初始化令牌保护
    initAuthTokenProtection();
    
    // 标记为已初始化
    this.initialized = true;
    console.log("Auth protection service initialized");
  }
  
  /**
   * 检测是否有有效认证令牌
   */
  hasValidToken(): boolean {
    const localToken = localStorage.getItem('authToken');
    const sessionToken = sessionStorage.getItem('tempAuthToken');
    
    return !!(localToken || sessionToken);
  }
  
  /**
   * 确保令牌在语言切换期间得到保留
   * 在语言切换前调用
   */
  preserveTokenDuringLanguageChange() {
    const token = localStorage.getItem('authToken');
    if (token) {
      sessionStorage.setItem('tempAuthToken', token);
      console.log("Token preserved for language change");
    }
  }
  
  /**
   * 在语言切换后恢复令牌
   * 在语言切换完成后调用
   */
  restoreTokenAfterLanguageChange() {
    const sessionToken = sessionStorage.getItem('tempAuthToken');
    if (sessionToken && !localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', sessionToken);
      console.log("Token restored after language change");
    }
  }
}

// 导出单例实例
export const authProtectionService = new AuthProtectionService();
export default authProtectionService;
