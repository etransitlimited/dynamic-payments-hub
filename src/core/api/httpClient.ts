
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { toast } from '@/hooks/use-toast';
import { API_URLS } from './apiUrls';

// 基础API配置
const apiConfig: AxiosRequestConfig = {
  baseURL: '/api', // API基础路径，可以根据环境变量配置
  timeout: 30000, // 30秒请求超时
  headers: {
    'Content-Type': 'application/json',
  },
};

// 双token存储键名
const ACCESS_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// 创建axios实例
const httpClient: AxiosInstance = axios.create(apiConfig);

// 是否正在刷新token
let isRefreshing = false;
// 等待刷新token的请求队列
const waitingQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}> = [];

// 刷新token函数
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token'));
    }
    
    const response = await axios.post(
      API_URLS.USER.REFRESH_TOKEN, 
      { refreshToken },
      { baseURL: apiConfig.baseURL }
    );
    
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    
    // 保存新的token
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
    
    // 同时保存一份到sessionStorage，用于语言切换时保留
    sessionStorage.setItem('tempAuthToken', accessToken);
    sessionStorage.setItem('tempRefreshToken', newRefreshToken);
    
    return accessToken;
  } catch (error) {
    // 刷新token失败，清除所有token
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem('tempAuthToken');
    sessionStorage.removeItem('tempRefreshToken');
    
    // 重定向到登录页
    window.location.href = '/login';
    return Promise.reject(error);
  }
};

// 执行队列中的请求
const processQueue = (error: Error | null, token: string | null = null) => {
  waitingQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }
    
    // 更新Authorization头
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 重新发送请求
    resolve(httpClient(config));
  });
  
  // 清空队列
  waitingQueue.length = 0;
};

// 请求拦截器
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加语言参数
    const lang = localStorage.getItem('language') || 'zh-CN';
    
    // 确保headers存在并且设置正确的类型
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    
    config.headers['Accept-Language'] = lang;
    
    // 添加认证令牌
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 添加请求时间戳，避免缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 针对特定API的响应格式处理
    // 例如: {code: 0, data: {...}, message: 'success'}
    const res = response.data;
    
    if (res.code !== undefined && res.code !== 0) {
      // 处理业务错误
      const errorMessage = res.message || '操作失败';
      console.error(`[API错误] ${errorMessage}`);
      
      // 显示错误提示
      toast({
        title: "操作失败",
        description: errorMessage,
        variant: "destructive",
      });
      
      // 可以在这里处理特定错误码，如401鉴权失败等
      if (res.code === 401) {
        // 清除认证并重定向到登录页
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(errorMessage));
    }
    
    return res.data !== undefined ? res.data : res;
  },
  async (error: AxiosError) => {
    // 获取原始请求配置
    const originalConfig = error.config as InternalAxiosRequestConfig;
    
    // 如果不是401错误或者没有配置，直接拒绝
    if (!error.response || error.response.status !== 401 || !originalConfig) {
      if (error.response) {
        // 服务器返回了错误状态码
        const status = error.response.status;
        let errorMessage = '';
        let errorTitle = '请求错误';
        
        switch (status) {
          case 401:
            errorMessage = '用户未授权，请重新登录';
            errorTitle = '认证失败';
            break;
          case 403:
            errorMessage = '拒绝访问';
            errorTitle = '权限错误';
            break;
          case 404:
            errorMessage = '请求的资源不存在';
            errorTitle = '资源未找到';
            break;
          case 500:
            errorMessage = '服务器内部错误';
            errorTitle = '服务器错误';
            break;
          default:
            errorMessage = `请求错误 (${status})`;
            errorTitle = '网络错误';
        }
        
        console.error(`[HTTP错误] ${errorMessage}`);
        
        // 显示错误提示
        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
        });
      } else if (error.request) {
        // 请求发出但没有收到响应
        console.error('[网络错误] 服务器无响应，请检查您的网络连接');
        
        toast({
          title: "网络连接错误",
          description: "服务器无响应，请检查您的网络连接",
          variant: "destructive",
        });
      } else {
        // 请求配置错误
        console.error(`[请求错误] ${error.message}`);
        
        toast({
          title: "请求配置错误",
          description: error.message || "发生未知错误",
          variant: "destructive",
        });
      }
      
      return Promise.reject(error);
    }
    
    // 如果是刷新token的请求失败，则直接拒绝
    if (originalConfig.url === API_URLS.USER.REFRESH_TOKEN) {
      // 清除token并重定向到登录页
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      sessionStorage.removeItem('tempAuthToken');
      sessionStorage.removeItem('tempRefreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // 防止重复刷新
    if (originalConfig._retry) {
      return Promise.reject(error);
    }
    
    originalConfig._retry = true;
    
    // 如果正在刷新token，则将请求加入队列
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        waitingQueue.push({
          resolve,
          reject,
          config: originalConfig
        });
      });
    }
    
    isRefreshing = true;
    
    try {
      // 刷新token
      const newToken = await refreshToken();
      
      // 处理队列中的请求
      processQueue(null, newToken);
      
      // 更新当前请求的Authorization头
      if (originalConfig.headers) {
        originalConfig.headers['Authorization'] = `Bearer ${newToken}`;
      }
      
      // 重新发送请求
      isRefreshing = false;
      return httpClient(originalConfig);
    } catch (refreshError) {
      // 刷新token失败，处理队列中的请求并拒绝
      processQueue(refreshError as Error);
      isRefreshing = false;
      
      // 清除token并重定向到登录页
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      sessionStorage.removeItem('tempAuthToken');
      sessionStorage.removeItem('tempRefreshToken');
      window.location.href = '/login';
      
      return Promise.reject(refreshError);
    }
  }
);

// 修改登录API以支持双token
export const loginWithDualToken = async (credentials: { email: string; password: string }): Promise<void> => {
  try {
    const response = await httpClient.post(API_URLS.USER.LOGIN, credentials);
    const { accessToken, refreshToken } = response;
    
    // 保存双token
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    
    // 同时保存一份到sessionStorage，用于语言切换时保留
    sessionStorage.setItem('tempAuthToken', accessToken);
    sessionStorage.setItem('tempRefreshToken', refreshToken);
    
    // 创建登录成功事件
    const loginEvent = new CustomEvent('auth:login');
    window.dispatchEvent(loginEvent);
    
    return response;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 导出请求方法
export const get = <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return httpClient.get(url, { params, ...config });
};

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return httpClient.post(url, data, config);
};

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return httpClient.put(url, data, config);
};

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return httpClient.delete(url, config);
};

export default httpClient;
