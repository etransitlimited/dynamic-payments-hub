
import { USER_API_PATHS } from '@/modules/user/api/userApi';
import { PAYMENT_API_PATHS } from '@/modules/payment/api/paymentApi';
import { WITHDRAW_API_PATHS } from '@/modules/withdraw/api/withdrawApi';
import { CARD_API_PATHS } from '@/modules/card/api/cardApi';
import { MESSAGE_API_PATHS } from '@/modules/message/api/messageApi';
import { SYSTEM_API_PATHS } from '@/modules/system/api/systemApi';

// 汇总所有模块的 API URL 常量
export const API_URLS = {
  USER: USER_API_PATHS,
  PAYMENT: PAYMENT_API_PATHS,
  WITHDRAW: WITHDRAW_API_PATHS,
  CARD: CARD_API_PATHS,
  MESSAGE: MESSAGE_API_PATHS,
  SYSTEM: SYSTEM_API_PATHS
};

// 导出各模块已实例化的 API 服务
export * from '@/modules/user/api/userApi';
export * from '@/modules/payment/api/paymentApi';
export * from '@/modules/withdraw/api/withdrawApi';
export * from '@/modules/card/api/cardApi';
export * from '@/modules/message/api/messageApi';
export * from '@/modules/system/api/systemApi';
