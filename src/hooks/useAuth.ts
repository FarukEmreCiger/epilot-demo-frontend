import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { AuthState, LoginForm, RegisterForm } from '../types/auth.types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setAuthState(prev => ({
        ...prev,
        user,
        loading: false
      }));
    });

    return unsubscribe;
  }, []);

  const login = async (formData: LoginForm) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await authService.login(formData);
      setAuthState(prev => ({ ...prev, user, loading: false }));
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message 
      }));
      throw error;
    }
  };

  const register = async (formData: RegisterForm) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await authService.register(formData);
      setAuthState(prev => ({ ...prev, user, loading: false }));
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message 
      }));
      throw error;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await authService.logout();
      setAuthState(prev => ({ ...prev, user: null, loading: false }));
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message 
      }));
      throw error;
    }
  };

  const getToken = async (): Promise<string> => {
    try {
      return await authService.getCurrentUserToken();
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    login,
    register,
    logout,
    getToken,
    clearError
  };
}; 