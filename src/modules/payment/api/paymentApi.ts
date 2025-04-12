
import { get, post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { PageParams } from '@/core/api/types';

// 支付模块API类型
export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  description?: string;
}

// 支付创建请求参数
export interface PaymentCreateParams {
  amount: number;
  currency: string;
  paymentMethod: string;
  description?: string;
}

// 支付模块API隔离层
export const payment_api_en_create = async (data: PaymentCreateParams): Promise<{ paymentId: string }> => {
  // 使用HTTP客户端发送POST请求
  return post<{ paymentId: string }>(API_URLS.PAYMENT.CREATE, data);
};

export const payment_api_en_getList = async (params: PageParams): Promise<{
  records: PaymentRecord[];
  total: number;
}> => {
  // 使用HTTP客户端发送GET请求
  return get<{ records: PaymentRecord[]; total: number }>(API_URLS.PAYMENT.LIST, params);
};

export const payment_api_en_getDetail = async (id: string): Promise<PaymentRecord | null> => {
  // 使用HTTP客户端发送GET请求
  return get<PaymentRecord | null>(`${API_URLS.PAYMENT.DETAIL}/${id}`);
};
