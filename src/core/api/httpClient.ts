
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { toast } from '@/hooks/use-toast';
import { getAuthTokenFromStorage, getUserFromStorage } from '@/auth/storage';

// 基础API配置
const apiConfig: AxiosRequestConfig = {
  baseURL: '/api', // API基础路径，可以根据环境变量配置
  timeout: 30000, // 30秒请求超时
  headers: {
    'Content-Type': 'application/json',
  },
};

// 创建axios实例
const httpClient: AxiosInstance = axios.create(apiConfig);

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
    const token = getAuthTokenFromStorage();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      
      // 添加用户ID，便于后端识别
      try {
        const user = getUserFromStorage();
        if (user && user.id) {
          config.headers['X-User-ID'] = user.id;
        }
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
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
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(errorMessage));
    }
    
    return res.data !== undefined ? res.data : res;
  },
  (error: AxiosError) => {
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status;
      let errorMessage = '';
      let errorTitle = '请求错误';
      
      switch (status) {
        case 401:
          errorMessage = '用户未授权，请重新登录';
          errorTitle = '认证失败';
          // 清除认证并重定向到登录页
          localStorage.removeItem('authToken');
          window.location.href = '/login';
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
);

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
