import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { VALIDATION, ERROR_MESSAGES } from '../../utils/constants';

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const { login, authLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập tài khoản';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        setErrors({ submit: result.message || 'Đăng nhập thất bại' });
      }
    } catch (error) {
      setErrors({ submit: ERROR_MESSAGES.NETWORK_ERROR });
    }
  };

  return (
    <div 
      className="max-w-3xl mx-auto overflow-hidden border-2 border-solid border-black"
      style={{
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px', 
        borderBottomRightRadius: '150px',
        borderBottomLeftRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '8px 8px 24px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đăng nhập
          </h2>
          <p className="text-gray-600 text-sm">
            Sử dụng tài khoản và mật khẩu để truy cập hệ thống
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mr-10 ml-10'>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Tài khoản <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập tài khoản"
              autoComplete="username"
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
          </div>

          <div className='mr-10 ml-10'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className='mr-10 ml-10'>
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mr-10 ml-10">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className={`px-24 py-3 rounded-xl font-semibold text-white text-lg transition-colors mx-auto block ${
              authLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {authLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang đăng nhập...
              </div>
            ) : (
              'Đăng nhập'
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>

          <div className="text-center border-t pt-4 mt-6">
            <p className="text-sm text-gray-600">
              Chưa có thẻ thư viện?{' '}
              <button
                type="button"
                onClick={() => window.location.href = '/card-register'}
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                Đăng ký thẻ thư viện trước
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;