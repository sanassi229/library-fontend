import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CardRegisterForm from '../components/auth/CardRegisterForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const CardRegister = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleRegistrationSuccess = (result) => {
    const { cardId, name, email, message } = result;

    setRegistrationSuccess({
      cardId,
      name,
      email,
      message
    });
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="flex-shrink-0">
          <Navbar />
        </header>

        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Đăng ký thẻ thư viện thành công! Vui lòng kiểm tra email để nhận mã thẻ.
              </h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">
                  Thông tin thẻ thư viện:
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Mã thẻ:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{registrationSuccess.cardId}</span></p>
                  <p><strong>Họ tên:</strong> {registrationSuccess.name}</p>
                  <p><strong>Email:</strong> {registrationSuccess.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  👤 Đăng ký tài khoản ngay
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  🏠 Về trang chủ
                </button>


              </div>
            </div>
          </div>
        </main>

        <footer className="flex-shrink-0 w-full">
          <Footer />
        </footer>
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
        style={{ backgroundImage: 'url("/library-bg.png")' }}
      >
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 h-full">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <CardRegisterForm
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

export default CardRegister;