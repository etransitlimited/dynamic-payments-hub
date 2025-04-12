
import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';

// Base configuration for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Create axios instance with default configuration
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // 安全地处理headers
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle authentication errors
      if (status === 401 || status === 403) {
        // 避免在页面跳转期间清除token
        const pathname = window.location.pathname;
        if (!pathname.includes('/login')) {
          // 记录当前路径以便登录后返回
          sessionStorage.setItem('redirectPath', pathname);
          
          // 双TOKEN存储 - 保存到sessionStorage作为备份
          const token = localStorage.getItem('authToken');
          if (token) {
            sessionStorage.setItem('tempAuthToken', token);
            console.log("Token backup created in session storage");
          }
          
          // 改用history.pushState避免整页刷新
          window.history.pushState({}, '', '/login');
          // 使用自定义事件通知应用程序状态改变
          window.dispatchEvent(new CustomEvent('auth:statusChange', { 
            detail: { status: 'unauthenticated' } 
          }));
        }
      }
      
      // Log errors but don't expose details to users
      console.error(`API Error (${status}):`, data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// 修复: 导出请求方法，确保参数顺序正确
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return instance.get<T>(url, config).then(response => response.data);
};

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.post<T>(url, data, config).then(response => response.data);
};

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return instance.put<T>(url, data, config).then(response => response.data);
};

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return instance.delete<T>(url, config).then(response => response.data);
};

export default instance;
