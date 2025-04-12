
import { get, post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { PageParams } from '@/core/api/types';

// 提现模块API类型
export interface WithdrawRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  accountInfo: string;
  fee?: number;
  remarks?: string;
}

// 提现申请参数
export interface WithdrawApplyParams {
  amount: number;
  currency: string;
  accountInfo: string;
  remarks?: string;
}

// 提现模块API隔离层
export const withdraw_api_en_apply = async (data: WithdrawApplyParams): Promise<{ withdrawId: string }> => {
  // 真实环境中这里会调用API
  return Promise.resolve({ withdrawId: `wd_${Date.now()}` });
};

export const withdraw_api_en_getList = async (params: PageParams): Promise<{
  records: WithdrawRecord[];
  total: number;
}> => {
  // 真实环境中这里会调用API
  return Promise.resolve({
    records: [],
    total: 0
  });
};

export const withdraw_api_en_cancel = async (id: string): Promise<boolean> => {
  // 真实环境中这里会调用API
  return Promise.resolve(true);
};
