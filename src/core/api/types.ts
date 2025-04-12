
// 通用API响应类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 分页响应类型
export interface PagedResponse<T = any> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

// 分页请求参数类型
export interface PageParams {
  current?: number;
  size?: number;
  [key: string]: any;
}
