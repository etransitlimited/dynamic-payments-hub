
import { API_URLS } from '@/core/api/apiUrls';
import { PageParams } from '@/core/api/types';
import { ApiService, createApiService } from '@/core/api/apiService';

// 提现模块API类型
export interface WithdrawRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  description?: string;
}

// 提现申请请求参数
export interface WithdrawApplyParams {
  amount: number;
  currency: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  description?: string;
}

// 创建提现模块API服务实例
const withdrawApiService = createApiService<WithdrawRecord>(API_URLS.WITHDRAW.LIST);

// 提现模块API隔离层 - 英文版本
export const withdraw_api_en_apply = async (data: WithdrawApplyParams): Promise<{ withdrawId: string }> => {
  return withdrawApiService.customPost<{ withdrawId: string }>(API_URLS.WITHDRAW.APPLY, data);
};

export const withdraw_api_en_getList = async (params: PageParams): Promise<{
  records: WithdrawRecord[];
  total: number;
}> => {
  return withdrawApiService.getList(params);
};

export const withdraw_api_en_cancel = async (id: string): Promise<boolean> => {
  return withdrawApiService.customPost<boolean>(`${API_URLS.WITHDRAW.CANCEL}/${id}`, {});
};

// 导出提现模块的API服务
export default withdrawApiService;
