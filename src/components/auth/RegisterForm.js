import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { VALIDATION, ERROR_MESSAGES } from '../../utils/constants';

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const { register, authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cardId: '', // ← Thay địa chỉ thành mã thẻ
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    } else if (formData.name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
      newErrors.name = `Họ tên phải có ít nhất ${VALIDATION.NAME_MIN_LENGTH} ký tự`;
    } else if (formData.name.trim().length > VALIDATION.NAME_MAX_LENGTH) {
      newErrors.name = `Họ tên không được quá ${VALIDATION.NAME_MAX_LENGTH} ký tự`;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      newErrors.password = `Mật khẩu phải có ít nhất ${VALIDATION.PASSWORD_MIN_LENGTH} ký tự`;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }

    // Validation cho mã thẻ (optional - chỉ validate nếu có nhập)
    if (formData.cardId.trim()) {
      if (formData.cardId.trim().length !== 12) {
        newErrors.cardId = 'Mã thẻ phải có đúng 12 ký tự';
      } else if (!/^LIB[A-Z0-9]{9}$/.test(formData.cardId.trim().toUpperCase())) {
        newErrors.cardId = 'Mã thẻ phải có định dạng LIB + 9 ký tự/số (VD: LIB123ABC789)';
      }
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
      // Chuẩn bị data để gửi API
      const apiData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        // Chỉ gửi cardId nếu user có nhập
        ...(formData.cardId.trim() && { cardId: formData.cardId.trim().toUpperCase() })
      };

      const result = await register(apiData);
      
      if (result.success) {
        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: ERROR_MESSAGES.NETWORK_ERROR });
    }
  };

  return (
      <div 
  className=" max-w-3xl mx-auto overflow-hidden border-2 border-solid border-black"
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
         Đăng ký tài khoản
        </h2>
        <p className="text-gray-600 text-sm">
          Tạo tài khoản mới để sử dụng hệ thống thư viện
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
       <div className='mr-10 ml-10'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nhập họ và tên"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="name@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <div>
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
                placeholder="Mật khẩu"
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
        </div>

       <div className='mr-10 ml-10'>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nhập lại mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập lại mật khẩu"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

       <div className='mr-10 ml-10'>
          <label htmlFor="cardId" className="block text-sm font-medium text-gray-700 mb-1">
            Mã thẻ thư viện <span className="text-gray-500">(Tùy chọn)</span>
          </label>
          <input
            type="text"
            id="cardId"
            name="cardId"
            value={formData.cardId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.cardId ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="VD: LIB123ABC789 (để trống nếu chưa có)"
            maxLength={12}
          />
          {errors.cardId && <p className="mt-1 text-sm text-red-500">{errors.cardId}</p>}
          <p className="mt-1 text-xs text-gray-500">
            💡 Nếu bạn đã đăng ký thẻ thư viện, nhập mã thẻ để liên kết tài khoản
          </p>
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
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
              Đang đăng ký...
            </div>
          ) : (
            'Đăng ký tài khoản'
          )}
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>

        <div className="text-center border-t pt-4 mt-6">
          <p className="text-sm text-gray-600">
            Chưa có thẻ thư viện?{' '}
            <a href="/card-register" className="text-primary-600 hover:text-primary-700 font-medium">
              Đăng ký thẻ thư viện
            </a>
          </p>
        </div>
      </form>
    </div>
   </div>
  );
};

export default RegisterForm;