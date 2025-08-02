import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CardRegister from './pages/CardRegister';
import Browse from './pages/Browse';
import ContactUs from './pages/ContactUs';
import DetailBook from './pages/DetailBook'; // Import component DetailBook mới
import PersonalBookshelf from './pages/PersonalBookshelf'; // Tạo file này trong thư mục pages
import ShoppingCart from './pages/ShoppingCart'; // Tạo file này trong thư mục pages
import Profile from './pages/Profile'; // Import component Profile mới


const Admin = () => (
  <Layout>
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ⚙️ Quản trị hệ thống
          </h1>
          <p className="text-gray-600 mb-8">
            Dashboard quản lý thư viện
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Admin dashboard sẽ được implement với charts và management tools
            </p>
            <Link 
              to="/" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/card-register" element={<CardRegister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/books/:bookId" element={<DetailBook />} />
            <Route path="/bookshelf" element={<PersonalBookshelf />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={
              <Layout>
                <div className="py-16">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      404 - Trang không tìm thấy
                    </h1>
                    <p className="text-gray-600 mb-8">
                      Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
                    </p>
                    <div className="space-x-4">
                      <Link 
                        to="/" 
                        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        🏠 Về trang chủ
                      </Link>
                      <Link 
                        to="/browse" 
                        className="bg-secondary-100 hover:bg-secondary-200 text-secondary-700 px-6 py-3 rounded-lg font-medium"
                      >
                        📚 Duyệt sách
                      </Link>
                    </div>
                  </div>
                </div>
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
