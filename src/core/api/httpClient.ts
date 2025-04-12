
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { toast } from '@/hooks/use-toast';
import { 
  getAuthTokenFromStorage, 
  getUserFromStorage,
  getRefreshTokenFromStorage,
  setAuthTokenInStorage,
  setRefreshTokenInStorage,
  removeAuthTokenFromStorage,
  removeRefreshTokenFromStorage
} from '@/auth/storage';

// 基础API配置
const apiConfig: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 创建axios实例
const httpClient: AxiosInstance = axios.create(apiConfig);

// 标记是否正在刷新token
let isRefreshing = false;
// 存储等待token刷新的请求
let refreshSubscribers: ((token: string) => void)[] = [];

// 执行等待中的请求
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// 添加等待token刷新的请求到队列
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 刷新Token的方法
const refreshToken = async () => {
  try {
    const refreshToken = getRefreshTokenFromStorage();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post('/api/auth/refresh', {
      refreshToken
    });

    const { accessToken, newRefreshToken } = response.data;
    setAuthTokenInStorage(accessToken);
    
    if (newRefreshToken) {
      setRefreshTokenInStorage(newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    // 刷新失败，清除所有认证信息
    removeAuthTokenFromStorage();
    removeRefreshTokenFromStorage();
    window.location.href = '/login';
    throw error;
  }
};

// 请求拦截器
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加语言参数
    const lang = localStorage.getItem('language') || 'zh-CN';
    
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    
    config.headers['Accept-Language'] = lang;
    
    // 添加认证令牌
    const token = getAuthTokenFromStorage();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      
      try {
        const user = getUserFromStorage();
        if (user && user.id) {
          config.headers['X-User-ID'] = user.id;
        }
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
    
    // 添加请求时间戳避免缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = { ...config.params, _t: Date.now() };
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    
    if (res.code !== undefined && res.code !== 0) {
      const errorMessage = res.message || '操作失败';
      console.error(`[API错误] ${errorMessage}`);
      
      toast({
        title: "操作失败",
        description: errorMessage,
        variant: "destructive",
      });
      
      return Promise.reject(new Error(errorMessage));
    }
    
    return res.data !== undefined ? res.data : res;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // 处理401错误（Token过期）
    if (error.response?.status === 401 && originalRequest) {
      if (!isRefreshing) {
        isRefreshing = true;
        
        try {
          // 尝试刷新Token
          const newToken = await refreshToken();
          isRefreshing = false;
          
          // 更新原始请求的Token
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          }
          
          // 执行所有等待的请求
          onRefreshed(newToken);
          
          // 重试原始请求
          return httpClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          
          // Token刷新失败，清除认证信息并跳转到登录页
          removeAuthTokenFromStorage();
          removeRefreshTokenFromStorage();
          
          toast({
            title: "认证已过期",
            description: "请重新登录",
            variant: "destructive",
          });
          
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // 如果正在刷新Token，将请求加入等待队列
        return new Promise(resolve => {
          addRefreshSubscriber(token => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            resolve(httpClient(originalRequest));
          });
        });
      }
    }

    // 处理其他错误
    if (error.response) {
      const status = error.response.status;
      let errorMessage = '';
      let errorTitle = '请求错误';
      
      switch (status) {
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
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } else if (error.request) {
      console.error('[网络错误] 服务器无响应，请检查您的网络连接');
      
      toast({
        title: "网络连接错误",
        description: "服务器无响应，请检查您的网络连接",
        variant: "destructive",
      });
    } else {
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
