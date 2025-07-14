import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { VALIDATION, ERROR_MESSAGES } from '../../utils/constants';

const CardRegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const { registerCard, authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cccd: '',
    avatar: null,
    hasExistingAccount: false
  });
  const [errors, setErrors] = useState({});

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!VALIDATION.PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }

    if (!formData.cccd.trim()) {
      newErrors.cccd = 'Vui lòng nhập số CCCD';
    } else if (formData.cccd.length !== 12) {
      newErrors.cccd = 'CCCD phải có 12 số';
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
      const result = await registerCard(formData);
      
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
          Đăng ký thẻ thư viện
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ Tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder=""
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder=""
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : ''
            }`}
            placeholder=""
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : ''
              }`}
              placeholder=""
            />
            <div className="absolute right-2 top-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số CCCD <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cccd"
            value={formData.cccd}
            onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.cccd ? 'border-red-500' : ''
            }`}
            placeholder=""
            maxLength="12"
          />
          {errors.cccd && <p className="mt-1 text-sm text-red-500">{errors.cccd}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Ảnh chụp hình thẻ * <span className="text-sm text-gray-500">2 hình trước - sau CCCD</span>
          </label>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload" className="cursor-pointer text-center">
                <div className="text-2xl text-gray-400 mb-1">📷</div>
                <div className="text-xs text-gray-500">Avatar</div>
              </label>
            </div>

            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="cccd-front"
              />
              <label htmlFor="cccd-front" className="cursor-pointer text-center">
                <div className="text-2xl text-gray-400 mb-1">📷</div>
                <div className="text-xs text-gray-500">CCCD trước</div>
              </label>
            </div>

            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="cccd-back"
              />
              <label htmlFor="cccd-back" className="cursor-pointer text-center">
                <div className="text-2xl text-gray-400 mb-1">📷</div>
                <div className="text-xs text-gray-500">CCCD sau</div>
              </label>
            </div>
          </div>
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
            'Đăng ký'
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Đăng ký tài khoản ngay
            </button>
          </p>
        </div>
      </form>
    </div>
    </div>

  );
};

export default CardRegisterForm;