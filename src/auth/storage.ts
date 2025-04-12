import { User } from '@/types/auth';

export const AUTH_TOKEN_KEY = 'authToken';
export const USER_DATA_KEY = 'userData';
export const TEMP_AUTH_TOKEN_KEY = 'tempAuthToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAuthTokenFromStorage = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthTokenInStorage = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeAuthTokenFromStorage = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getTempAuthTokenFromStorage = (): string | null => {
  return sessionStorage.getItem(TEMP_AUTH_TOKEN_KEY);
};

export const setTempAuthTokenInStorage = (token: string): void => {
  sessionStorage.setItem(TEMP_AUTH_TOKEN_KEY, token);
};

export const removeTempAuthTokenFromStorage = (): void => {
  sessionStorage.removeItem(TEMP_AUTH_TOKEN_KEY);
};

export const getRefreshTokenFromStorage = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshTokenInStorage = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshTokenFromStorage = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getUserFromStorage = (): User | null => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

export const setUserInStorage = (user: User): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const removeUserFromStorage = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

export const syncTokens = (): string | null => {
  const localToken = getAuthTokenFromStorage();
  const sessionToken = getTempAuthTokenFromStorage();
  
  if (sessionToken && !localToken) {
    setAuthTokenInStorage(sessionToken);
    return sessionToken;
  }
  
  return localToken;
};
