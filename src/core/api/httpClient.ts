
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/utils/env';

// 创建一个Axios实例
const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求队列和刷新状态
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 订阅token刷新
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// 执行队列中的请求
function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
}

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // 修复类型错误，确保 headers 是 AxiosRequestHeaders 类型
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    // 401错误且不是刷新token的请求
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh-token') {
      if (isRefreshing) {
        // 如果已经在刷新中，则将请求加入队列
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // 无刷新令牌，清除登录状态
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.dispatchEvent(new Event('auth:logout'));
          return Promise.reject(new Error('Refresh token not found'));
        }
        
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`, 
          { refreshToken },
          { baseURL: API_BASE_URL }
        );
        
        // 修正：从响应数据中正确提取令牌
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        
        // 保存新令牌
        localStorage.setItem('authToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        // 更新所有请求的 Authorization 标头
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        // 处理队列中的请求
        onTokenRefreshed(newAccessToken);
        
        // 重试原始请求
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // 刷新失败，清除令牌
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        
        // 触发登出事件
        window.dispatchEvent(new Event('auth:logout'));
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

// 通用请求函数
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await instance(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
}

// 辅助方法: GET
export async function get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({
    method: 'GET',
    url,
    params,
    ...config,
  });
}

// 辅助方法: POST
export async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({
    method: 'POST',
    url,
    data,
    ...config,
  });
}

// 辅助方法: PUT
export async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({
    method: 'PUT',
    url,
    data,
    ...config,
  });
}

// 辅助方法: DELETE
export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return request<T>({
    method: 'DELETE',
    url,
    ...config,
  });
}

// 导出实例和方法
export default instance;
