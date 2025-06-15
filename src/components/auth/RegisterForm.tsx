import React, { useState } from 'react';
import { RegisterForm as RegisterFormType } from '../../types/auth.types';

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormType) => Promise<void>;
  loading: boolean;
  error: string | null;
  onToggleForm: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading,
  error,
  onToggleForm
}) => {
  const [formData, setFormData] = useState<RegisterFormType>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState<Partial<RegisterFormType>>({});

  const validateForm = (): boolean => {
    const errors: Partial<RegisterFormType> = {};

    // E-posta kontrolü
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Şifre kontrolü
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Şifre onayı kontrolü
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
    if (validationErrors[name as keyof RegisterFormType]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const getPasswordStrength = (password: string): { level: number; text: string; colorClass: string } => {
    if (password.length === 0) return { level: 0, text: '', colorClass: 'message-info' };
    if (password.length < 6) return { level: 1, text: 'Weak', colorClass: 'message-error' };
    if (password.length < 8) return { level: 2, text: 'Medium', colorClass: 'message-warning' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { level: 4, text: 'Very Strong', colorClass: 'message-success' };
    }
    return { level: 3, text: 'Strong', colorClass: 'message-info' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="title-lg title-center">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              disabled={loading}
              required
              className={`input ${validationErrors.email ? 'input-error' : ''}`}
            />
            {validationErrors.email && (
              <div className="message message-error">
                {validationErrors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              disabled={loading}
              required
              className={`input ${validationErrors.password ? 'input-error' : ''}`}
            />
            {formData.password && (
              <div className={`message font-semibold ${passwordStrength.colorClass}`}>
                Password Strength: {passwordStrength.text}
              </div>
            )}
            {validationErrors.password && (
              <div className="message message-error">
                {validationErrors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              disabled={loading}
              required
              className={`input ${validationErrors.confirmPassword ? 'input-error' : ''}`}
            />
            {validationErrors.confirmPassword && (
              <div className="message message-error">
                {validationErrors.confirmPassword}
              </div>
            )}
          </div>

          {error && (
            <div className="message message-lg message-center message-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg mt-2"
          >
            {loading ? (
              <div className="loading-text">
                <div className="spinner"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <button
            type="button"
            onClick={onToggleForm}
            disabled={loading}
            className="btn btn-secondary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}; 