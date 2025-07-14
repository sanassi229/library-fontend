import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegistrationSuccess = (result) => {
    const { user, cardId, message } = result;
    
    setRegistrationSuccess({
      user,
      cardId,
      message
    });
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  if (registrationSuccess) {
    return (
  
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Đăng ký thành công!
              </h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">
                  Thông tin thẻ thư viện:
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Mã thẻ:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{registrationSuccess.cardId}</span></p>
                  <p><strong>Họ tên:</strong> {registrationSuccess.user.name}</p>
                  <p><strong>Email:</strong> {registrationSuccess.user.email}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-sm text-blue-800">
                  <h4 className="font-semibold mb-2">📧 Kiểm tra email của bạn</h4>
                  <p>
                    Chúng tôi đã gửi email xác nhận đến <strong>{registrationSuccess.user.email}</strong>
                  </p>
                  <p className="mt-1">
                    Vui lòng kiểm tra và làm theo hướng dẫn để kích hoạt thẻ thư viện.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoToDashboard}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  🏠 Vào trang chủ
                </button>
                
                <button
                  onClick={() => navigate('/browse')}
                  className="w-full bg-secondary-100 hover:bg-secondary-200 text-secondary-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  📚 Duyệt sách ngay
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Lưu ý: Bạn có thể bắt đầu duyệt sách ngay. Để mượn sách, vui lòng đợi thẻ thư viện được kích hoạt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen flex flex-col">
      <header className="flex-shrink-0">
      <Navbar />
    </header>
       <main 
      className="flex-grow  bg-cover"
      style={{backgroundImage: 'url("/library-bg.png")'}}
    >
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-full">
                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                    <RegisterForm 
          onSuccess={handleRegistrationSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
</div>
      
      </div>
      </main>
<footer className="flex-shrink-0 w-full">
      <Footer />
    </footer>     
    </div>
  );
};

export default Register;