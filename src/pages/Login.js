import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLoginSuccess = (result) => {
    const { user } = result;
    
    console.log('Login successful:', user);
    
    const from = location.state?.from?.pathname;
    
    if (from) {
      navigate(from, { replace: true });
    } else if (user.role === 'admin' || user.role === 'librarian') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

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
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <LoginForm 
              onSuccess={handleLoginSuccess}
              onSwitchToRegister={handleSwitchToRegister}
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

export default Login;