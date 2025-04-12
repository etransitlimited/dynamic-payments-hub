
import { API_URLS } from '@/core/api/apiUrls';
import { PageParams } from '@/core/api/types';
import { ApiService, createApiService } from '@/core/api/apiService';

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

// 创建支付模块API服务实例
const paymentApiService = createApiService<PaymentRecord>(API_URLS.PAYMENT.LIST.split('?')[0]);

// 支付模块API隔离层 - 英文版本
export const payment_api_en_create = async (data: PaymentCreateParams): Promise<{ paymentId: string }> => {
  return paymentApiService.customPost<{ paymentId: string }>(API_URLS.PAYMENT.CREATE, data);
};

export const payment_api_en_getList = async (params: PageParams): Promise<{
  records: PaymentRecord[];
  total: number;
}> => {
  return paymentApiService.getList(params);
};

export const payment_api_en_getDetail = async (id: string): Promise<PaymentRecord | null> => {
  return paymentApiService.customGet<PaymentRecord | null>(`${API_URLS.PAYMENT.DETAIL}/${id}`);
};

// 导出支付模块的API服务
export default paymentApiService;
