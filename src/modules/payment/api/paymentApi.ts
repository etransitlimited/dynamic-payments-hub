
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

// 支付模块API隔离层
export const payment_api_en_create = async (data: {
  amount: number;
  currency: string;
  paymentMethod: string;
  description?: string;
}): Promise<{ paymentId: string }> => {
  // 真实环境中这里会调用API
  return Promise.resolve({ paymentId: `pay_${Date.now()}` });
};

export const payment_api_en_getList = async (params: PageParams): Promise<{
  records: PaymentRecord[];
  total: number;
}> => {
  // 真实环境中这里会调用API
  return Promise.resolve({
    records: [],
    total: 0
  });
};

export const payment_api_en_getDetail = async (id: string): Promise<PaymentRecord | null> => {
  // 真实环境中这里会调用API
  return Promise.resolve(null);
};
