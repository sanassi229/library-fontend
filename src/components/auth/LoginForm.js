import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { VALIDATION, ERROR_MESSAGES } from '../../utils/constants';

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const { login, authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
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

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!VALIDATION.EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
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
    const result = await login(formData.email, formData.password);
      console.log('API Response:', result);
    console.log('result.message:', result.message);
    console.log('result.error:', result.error);
    
    if (result.success) {
      if (onSuccess) {
        onSuccess(result);
      }
    } else {
  setErrors({ submit: result.message || result.error || 'Đăng nhập thất bại' });
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
     <div className="text-center mb-6">
       <h2 className="text-2xl font-bold text-gray-900 mb-2">
         Đăng nhập
       </h2>
     </div>

     <form onSubmit={handleSubmit} className="space-y-4">
       <div className='mr-10 ml-10'>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
           Email
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
           autoComplete="email"
         />
         {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
       </div>

       <div className='mr-10 ml-10'>
         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
           Mật khẩu
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
             className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 w"
           >
             {showPassword ? '🙈' : '👁️'}
           </button>
         </div>
         {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
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
    ' Đăng nhập'
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

       {/* <div className="mt-6 pt-4 border-t border-gray-200">
         <p className="text-xs text-gray-500 text-center mb-2">Tài khoản demo (để test):</p>
         <div className="grid grid-cols-2 gap-2 text-xs">
           <div className="bg-gray-50 p-2 rounded">
             <p className="font-medium">Member:</p>
             <p>demo@member.com</p>
             <p>password123</p>
           </div>
           <div className="bg-gray-50 p-2 rounded">
             <p className="font-medium">Admin:</p>
             <p>admin@library.com</p>
             <p>admin123</p>
           </div>
         </div>
       </div> */}
     </form>
   </div>
 </div>
);
};

export default LoginForm;