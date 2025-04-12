
import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { useAuth } from '@/hooks/use-auth';

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
    
    // 修复: 解决类型错误，确保headers是AxiosHeaders类型
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
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        // Avoid redirect loops when already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
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

// Export request methods
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return instance.get<T>(url, config);
};

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return instance.post<T>(url, data, config);
};

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return instance.put<T>(url, data, config);
};

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return instance.delete<T>(url, config);
};

export default instance;
