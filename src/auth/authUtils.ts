
import { 
  getAuthTokenFromStorage, 
  getTempAuthTokenFromStorage, 
  setAuthTokenInStorage, 
  setTempAuthTokenInStorage,
  getUserFromStorage
} from './storage';
import { AuthState } from '@/types/auth';

export const preserveAuthDuringLanguageChange = (token: string | null): void => {
  if (token) {
    console.log("Auth: Preserving token during language change");
    setTempAuthTokenInStorage(token);
  }
};

export const restoreAuthAfterLanguageChange = (): string | null => {
  const tempToken = getTempAuthTokenFromStorage();
  if (tempToken && !getAuthTokenFromStorage()) {
    console.log("Auth: Restoring token from session storage after language change");
    setAuthTokenInStorage(tempToken);
    return tempToken;
  }
  return null;
};

export const dispatchLogoutEvent = (): void => {
  const logoutEvent = new CustomEvent('auth:logout');
  window.dispatchEvent(logoutEvent);
};

export const getInitialAuthState = (): AuthState => {
  const token = getAuthTokenFromStorage() || getTempAuthTokenFromStorage();
  const user = getUserFromStorage();
  
  return {
    isLoggedIn: !!token && !!user,
    isLoading: !token && !user ? false : true,
    user: user
  };
};
