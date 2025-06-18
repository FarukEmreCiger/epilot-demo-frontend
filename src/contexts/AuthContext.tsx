import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { AuthState, AuthUser, LoginForm, RegisterForm } from '../types/auth.types';

interface AuthContextType extends AuthState {
    login: (formData: LoginForm) => Promise<void>;
    register: (formData: RegisterForm) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged((user: AuthUser | null) => {
            console.log('AuthStateChanged', user);
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

    const clearError = () => {
        setAuthState(prev => ({ ...prev, error: null }));
    };

    const value: AuthContextType = {
        ...authState,
        login,
        register,
        logout,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 