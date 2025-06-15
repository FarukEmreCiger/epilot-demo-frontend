import React, { useState } from 'react';
import { LoginForm as LoginFormType } from '../../types/auth.types';

interface LoginFormProps {
  onSubmit: (formData: LoginFormType) => Promise<void>;
  loading: boolean;
  error: string | null;
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  error,
  onToggleForm
}) => {
  const [formData, setFormData] = useState<LoginFormType>({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState<Partial<LoginFormType>>({});

  const validateForm = (): boolean => {
    const errors: Partial<LoginFormType> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      // Hata useAuth hook'u tarafından yönetiliyor
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation error'ı temizle
    if (validationErrors[name as keyof LoginFormType]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col justify-center items-center p-5 font-sans">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">
          🔐 Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              disabled={loading}
              required
              className="w-full p-4 text-base bg-input-bg border-2 border-border-gray rounded-lg text-white outline-none transition-colors duration-300 ease-in-out box-border focus:border-primary-green disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {validationErrors.email && (
              <div className="text-error-red text-sm mt-2 text-left">
                {validationErrors.email}
              </div>
            )}
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              disabled={loading}
              required
              className="w-full p-4 text-base bg-input-bg border-2 border-border-gray rounded-lg text-white outline-none transition-colors duration-300 ease-in-out box-border focus:border-primary-green disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {validationErrors.password && (
              <div className="text-error-red text-sm mt-2 text-left">
                {validationErrors.password}
              </div>
            )}
          </div>

          {error && (
            <div className="text-error-red text-base text-center">
              Please check your email and password
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`p-4 text-lg font-bold bg-primary-green text-white border-none rounded-lg transition-all duration-300 ease-in-out mt-2.5 
              ${loading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'cursor-pointer hover:bg-primary-green-hover'
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2.5">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>

          <button
            type="button"
            onClick={onToggleForm}
            disabled={loading}
            className={`p-4 text-base bg-transparent text-text-gray border-2 border-border-gray rounded-lg transition-all duration-300 ease-in-out
              ${loading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'cursor-pointer hover:border-text-gray hover:text-white'
              }`}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}; 