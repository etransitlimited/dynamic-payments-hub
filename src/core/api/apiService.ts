
import { get, post, put, del } from './httpClient';
import { AxiosRequestConfig } from 'axios';

// 通用API服务类 - 提供模块化的API调用
export class ApiService<T> {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  // 获取列表数据
  async getList(params?: any, config?: AxiosRequestConfig): Promise<{records: T[], total: number}> {
    // 使用更新后的get函数，能够正确处理params
    return get<{records: T[], total: number}>(this.baseUrl, params, config);
  }
  
  // 获取详情数据
  async getDetail(id: string | number, config?: AxiosRequestConfig): Promise<T> {
    return get<T>(`${this.baseUrl}/${id}`, config);
  }
  
  // 创建数据
  async create(data: Partial<T>, config?: AxiosRequestConfig): Promise<T> {
    return post<T>(this.baseUrl, data, config);
  }
  
  // 更新数据
  async update(id: string | number, data: Partial<T>, config?: AxiosRequestConfig): Promise<T> {
    return put<T>(`${this.baseUrl}/${id}`, data, config);
  }
  
  // 删除数据
  async delete(id: string | number, config?: AxiosRequestConfig): Promise<any> {
    return del<any>(`${this.baseUrl}/${id}`, config);
  }
  
  // 自定义GET请求
  async customGet<R>(path: string, params?: any, config?: AxiosRequestConfig): Promise<R> {
    const url = path.startsWith('/') ? path : `${this.baseUrl}/${path}`;
    return get<R>(url, params, config);
  }
  
  // 自定义POST请求
  async customPost<R>(path: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const url = path.startsWith('/') ? path : `${this.baseUrl}/${path}`;
    return post<R>(url, data, config);
  }
  
  // 自定义PUT请求
  async customPut<R>(path: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const url = path.startsWith('/') ? path : `${this.baseUrl}/${path}`;
    return put<R>(url, data, config);
  }
  
  // 自定义DELETE请求
  async customDelete<R>(path: string, config?: AxiosRequestConfig): Promise<R> {
    const url = path.startsWith('/') ? path : `${this.baseUrl}/${path}`;
    return del<R>(url, config);
  }
}

// 创建服务实例的工厂函数
export function createApiService<T>(baseUrl: string): ApiService<T> {
  return new ApiService<T>(baseUrl);
}

export default ApiService;
