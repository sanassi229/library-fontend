import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import CardRegister from './pages/CardRegister'; 

const Home = () => (
  <Layout>
    <div className="w-full bg-gray-50">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            📚 Library Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Chào mừng đến với hệ thống quản lý thư viện hiện đại. 
            Tìm kiếm, mượn và quản lý sách một cách dễ dàng và hiệu quả.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/browse" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              📚 Duyệt sách ngay
            </Link>
            <Link 
              to="/register" 
              className="bg-secondary-100 hover:bg-secondary-200 text-secondary-700 px-8 py-4 rounded-lg font-medium text-lg transition-colors"
            >
              📝 Đăng ký thẻ thư viện
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-gray-600">
            Hệ thống thư viện với đầy đủ tính năng hiện đại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tìm kiếm thông minh
            </h3>
            <p className="text-gray-600">
              Tìm kiếm sách theo tên, tác giả, thể loại với công nghệ AI
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quản lý online
            </h3>
            <p className="text-gray-600">
              Mượn, trả sách và theo dõi lịch sử mọi lúc mọi nơi
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Gợi ý cá nhân
            </h3>
            <p className="text-gray-600">
              Nhận gợi ý sách phù hợp dựa trên sở thích đọc
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Con số ấn tượng
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Đầu sách</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">5,000+</div>
              <div className="text-gray-600">Độc giả</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Lượt mượn</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </Layout>
);

const Browse = () => (
  <Layout>
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📚 Duyệt sách
          </h1>
          <p className="text-gray-600 mb-8">
            Khám phá hàng nghìn đầu sách phong phú
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex">
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-r-lg font-medium">
                🔍 Tìm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {['Văn học', 'Khoa học', 'Lịch sử', 'Công nghệ'].map((category) => (
              <div key={category} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-2xl mb-2">📖</div>
                <div className="font-medium text-gray-900">{category}</div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Book grid sẽ được implement với BookCard components
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

const Collections = () => (
  <Layout>
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📁 Bộ sưu tập
          </h1>
          <p className="text-gray-600 mb-8">
            Khám phá các bộ sưu tập sách được tuyển chọn
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Sách hay tháng này', count: '25 cuốn', emoji: '⭐' },
              { title: 'Văn học Việt Nam', count: '150 cuốn', emoji: '🇻🇳' },
              { title: 'Khoa học công nghệ', count: '200 cuốn', emoji: '🔬' }
            ].map((collection, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">{collection.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{collection.title}</h3>
                <p className="text-gray-600">{collection.count}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Collection grid sẽ được implement với CollectionCard components
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

const Profile = () => (
  <Layout>
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            👤 Hồ sơ cá nhân
          </h1>
          <p className="text-gray-600 mb-8">
            Quản lý thông tin cá nhân và hoạt động thư viện
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Profile page sẽ được implement với user info và borrow history
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

const BorrowHistory = () => (
  <Layout>
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📋 Lịch sử mượn sách
          </h1>
          <p className="text-gray-600 mb-8">
            Theo dõi lịch sử mượn và trả sách
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Borrow history table sẽ được implement với data từ API
            </p>
            <Link 
              to="/profile" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Về hồ sơ
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

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
            <Route path="/collections" element={<Collections />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/card-register" element={<CardRegister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/borrow-history" element={<BorrowHistory />} />
            <Route path="/admin" element={<Admin />} />
            
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