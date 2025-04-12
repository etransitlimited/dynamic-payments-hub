
// API URL常量
export const API_URLS = {
  // 用户模块
  USER: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    PROFILE: '/user/profile',
    UPDATE_PASSWORD: '/user/updatePassword',
  },
  
  // 消息模块
  MESSAGE: {
    LIST: '/message/list',
    READ: '/message/read',
    READ_ALL: '/message/readAll',
  },
  
  // 支付模块
  PAYMENT: {
    CREATE: '/payment/create',
    LIST: '/payment/list',
    DETAIL: '/payment/detail',
  },
  
  // 提现模块
  WITHDRAW: {
    APPLY: '/withdraw/apply',
    LIST: '/withdraw/list',
    CANCEL: '/withdraw/cancel',
  },
  
  // 卡片模块
  CARD: {
    APPLY: '/card/apply',
    LIST: '/card/list',
    ACTIVATE: '/card/activate',
  },
  
  // 系统模块
  SYSTEM: {
    CONFIG: '/system/config',
    NOTICE: '/system/notice',
  }
};
