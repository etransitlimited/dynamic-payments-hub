
import { post } from '@/core/api/httpClient';
import { API_URLS } from '@/core/api/apiUrls';
import { ApiService, createApiService } from '@/core/api/apiService';

// 用户模块API类型
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  createdAt: string;
}

// 登录请求参数
export interface LoginParams {
  email: string;
  password: string;
}

// 注册请求参数
export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 修改密码请求参数
export interface UpdatePasswordParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 创建用户模块API服务实例
const userApiService = createApiService<UserProfile>(API_URLS.USER.PROFILE);

// 用户认证API - 分语言版本，遵循隔离规范
export const auth_api_en_login = async (data: LoginParams): Promise<{ 
  accessToken: string; 
  refreshToken: string;
  userInfo: UserProfile;
}> => {
  return post<{ accessToken: string; refreshToken: string; userInfo: UserProfile }>(
    API_URLS.USER.LOGIN, 
    data
  );
};

export const auth_api_en_register = async (data: RegisterParams): Promise<{ userId: string }> => {
  return post<{ userId: string }>(API_URLS.USER.REGISTER, data);
};

export const auth_api_en_getProfile = async (): Promise<UserProfile> => {
  return userApiService.customGet<UserProfile>('');
};

export const auth_api_en_updatePassword = async (data: UpdatePasswordParams): Promise<boolean> => {
  return userApiService.customPost<boolean>(API_URLS.USER.UPDATE_PASSWORD, data);
};

export const auth_api_en_refreshToken = async (refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  return post<{ accessToken: string; refreshToken: string }>(
    API_URLS.USER.REFRESH_TOKEN, 
    { refreshToken }
  );
};

// 中文版本的API接口
export const auth_api_zh_login = auth_api_en_login;
export const auth_api_zh_register = auth_api_en_register;
export const auth_api_zh_getProfile = auth_api_en_getProfile;
export const auth_api_zh_updatePassword = auth_api_en_updatePassword;
export const auth_api_zh_refreshToken = auth_api_en_refreshToken;

// 导出用户模块的API服务
export default userApiService;
