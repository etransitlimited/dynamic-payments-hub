
// Re-export all types from '@/types/auth'
export * from '@/types/auth';

// Re-export all utilities from storage
export {
  AUTH_TOKEN_KEY,
  USER_DATA_KEY,
  TEMP_AUTH_TOKEN_KEY,
  getAuthTokenFromStorage,
  setAuthTokenInStorage,
  removeAuthTokenFromStorage,
  getTempAuthTokenFromStorage,
  setTempAuthTokenInStorage,
  removeTempAuthTokenFromStorage,
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage,
  syncTokens
} from './storage';

// Re-export all utilities from authUtils
export {
  preserveAuthDuringLanguageChange,
  restoreAuthAfterLanguageChange,
  dispatchLogoutEvent,
  getInitialAuthState
} from './authUtils';
