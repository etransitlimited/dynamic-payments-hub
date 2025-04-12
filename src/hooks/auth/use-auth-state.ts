
import { useState } from 'react';
import { AuthState } from '@/auth';
import { getInitialAuthState } from '@/auth';

/**
 * Hook for managing authentication state
 */
export const useAuthState = () => {
  const [state, setState] = useState<AuthState>(getInitialAuthState());
  
  const updateState = (newState: Partial<AuthState>) => {
    setState(prevState => ({
      ...prevState,
      ...newState
    }));
  };

  const setLoggedIn = (user: AuthState['user']) => {
    setState({
      isLoggedIn: true,
      isLoading: false,
      user
    });
  };

  const setLoggedOut = () => {
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null
    });
  };

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading
    }));
  };

  return {
    state,
    updateState,
    setLoggedIn,
    setLoggedOut,
    setLoading
  };
};
