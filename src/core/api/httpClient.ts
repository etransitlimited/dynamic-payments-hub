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
      
      // 确保sessionStorage中也有令牌备份
      if (!sessionStorage.getItem('tempAuthToken')) {
        sessionStorage.setItem('tempAuthToken', token);
      }
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

// Export request methods with proper response handling
// Updated get function to handle both params and config cases
export const get = <T>(url: string, paramsOrConfig?: any, config?: AxiosRequestConfig): Promise<T> => {
  // If paramsOrConfig is an object but not an AxiosRequestConfig, treat it as params
  if (paramsOrConfig && typeof paramsOrConfig === 'object' && !config) {
    // Check if it looks like a config object (has typical axios config properties)
    const hasAxiosConfigProps = ['headers', 'timeout', 'baseURL', 'method'].some(
      prop => Object.prototype.hasOwnProperty.call(paramsOrConfig, prop)
    );
    
    if (!hasAxiosConfigProps) {
      // It's likely params, not config, so convert to params format
      return instance.get<T>(url, { params: paramsOrConfig }).then(response => response.data);
    }
  }
  
  // If config is provided, use paramsOrConfig as params
  if (config) {
    const configWithParams = {
      ...config,
      params: paramsOrConfig
    };
    return instance.get<T>(url, configWithParams).then(response => response.data);
  }
  
  // Otherwise treat paramsOrConfig as config
  return instance.get<T>(url, paramsOrConfig).then(response => response.data);
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
