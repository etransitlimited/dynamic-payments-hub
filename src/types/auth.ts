
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface AuthHookReturn extends AuthState {
  logout: () => void;
  login: (token: string) => void;
  forceRefresh: () => void;
}
