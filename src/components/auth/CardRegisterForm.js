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
    cccd: ''
  });
  const [errors, setErrors] = useState({});

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
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!VALIDATION.PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0987654321)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Địa chỉ phải có ít nhất 10 ký tự';
    }

    if (!formData.cccd.trim()) {
      newErrors.cccd = 'Vui lòng nhập số CCCD';
    } else if (!/^\d{12}$/.test(formData.cccd)) {
      newErrors.cccd = 'CCCD phải có đúng 12 chữ số';
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
        setErrors({ submit: result.message || result.error || 'Đăng ký thẻ thất bại' });
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
        <p className="text-gray-600 text-sm">
          Tạo thẻ thư viện để mượn sách và sử dụng các dịch vụ thư viện
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nhập họ và tên đầy đủ"
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
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="name@example.com"
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
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0987654321"
            maxLength="11"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Nhập địa chỉ đầy đủ (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

       <div className='mr-10 ml-10'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số CCCD/CMND <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cccd"
            value={formData.cccd}
            onChange={handleChange}
           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.cccd ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123456789012"
            maxLength="12"
          />
          {errors.cccd && <p className="mt-1 text-sm text-red-500">{errors.cccd}</p>}
    
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mr-10 ms-10">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mx-10">
          <h4 className="font-medium text-blue-800 mb-2">📋 Quy trình đăng ký:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>1. Điền đầy đủ thông tin và nhấn "Đăng ký"</p>
            <p>2. Kiểm tra email để nhận mã thẻ thư viện</p>
            <p>3. Sử dụng mã thẻ để đăng ký tài khoản trực tuyến</p>
          </div>
        </div>

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
            'Đăng ký thẻ thư viện'
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Đã có thẻ thư viện?{' '}
            <button
              type="button"
              onClick={() => window.location.href = '/register'}
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