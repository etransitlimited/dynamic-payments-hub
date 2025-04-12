
import { get, post, put, del } from './httpClient';
import { API_URLS } from './apiUrls';
import type { AxiosRequestConfig } from 'axios';

/**
 * API 服务工厂函数 - 基于模块创建API调用服务
 * @param baseModule 模块基础路径配置
 * @returns 包含该模块所有API调用方法的对象
 */
export function createApiService<T extends Record<string, string>>(baseModule: T) {
  const apiService = {} as Record<string, Function>;
  
  // 为每个API端点生成对应的请求方法
  Object.entries(baseModule).forEach(([key, path]) => {
    // GET 方法
    apiService[`${key}Get`] = <R>(params?: any, config?: AxiosRequestConfig) => 
      get<R>(path, params, config);
    
    // POST 方法
    apiService[`${key}Post`] = <R>(data?: any, config?: AxiosRequestConfig) => 
      post<R>(path, data, config);
    
    // PUT 方法
    apiService[`${key}Put`] = <R>(data?: any, config?: AxiosRequestConfig) => 
      put<R>(path, data, config);
    
    // DELETE 方法
    apiService[`${key}Delete`] = <R>(config?: AxiosRequestConfig) => 
      del<R>(path, config);
  });
  
  return apiService as {
    [K in keyof T as `${string & K}Get`]: <R>(params?: any, config?: AxiosRequestConfig) => Promise<R>;
  } & {
    [K in keyof T as `${string & K}Post`]: <R>(data?: any, config?: AxiosRequestConfig) => Promise<R>;
  } & {
    [K in keyof T as `${string & K}Put`]: <R>(data?: any, config?: AxiosRequestConfig) => Promise<R>;
  } & {
    [K in keyof T as `${string & K}Delete`]: <R>(config?: AxiosRequestConfig) => Promise<R>;
  };
}

/**
 * API URL 接口常量聚合导出
 */
export { API_URLS };

/**
 * HTTP 请求方法直接导出
 */
export { get, post, put, del };
