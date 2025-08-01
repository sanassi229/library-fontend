import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import CardRegister from './pages/CardRegister';
import Home from './pages/Home';
import AdminLayout from './components/layout/AdminLayout';
import CollectionsDetail from './pages/CollectionsDetail';
import ContactUs from './pages/ContactUs';
import Browse from './pages/Browse';
import Collections from './pages/Collections';
import UserBookDetail from './pages/BookDetail';

// Import các trang quản lý
import AuthorsManagement from './pages/admin/AdminAuthorsManagement';
import AuthorDetail from './pages/admin/AdminAuthorDetail';
import AuthorEdit from './pages/admin/AdminAuthorEdit';
import BooksManagement from './pages/admin/AdminBooksManagement';
import BookDetail from './pages/admin/AdminBookDetail';
import BookEdit from './pages/admin/AdminBookEdit';
import CollectionsManagement from './pages/admin/AdminCollectionsManagement';
import CollectionDetail from './pages/admin/AdminCollectionDetail';
import CollectionEdit from './pages/admin/AdminCollectionEdit';
import TagManagement from './pages/admin/AdminTagManagement';


// Các component và function còn lại giữ nguyên
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

const Admin = () => (<AdminLayout> {/* Sử dụng AdminLayout */}</AdminLayout>);

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* User Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/card-register" element={<CardRegister />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/borrow-history" element={<BorrowHistory />} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/contact-us" element={<ContactUs />} />                       
                        <Route path="/" element={<Home />} /><Route path="/browse" element={<Browse />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/collections/:id" element={<CollectionsDetail />} />
                        <Route path="/book/:id" element={<UserBookDetail />} />
                        {/* Admin Routes */}
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/authors" element={<AuthorsManagement />} />
                        <Route path="/admin/author/detail" element={<AuthorDetail />} />
                        <Route path="/admin/author/edit" element={<AuthorEdit />} />
                        <Route path="/admin/books" element={<BooksManagement />} />
                        <Route path="/admin/book/detail" element={<BookDetail />} />
                        <Route path="/admin/book/edit" element={<BookEdit />} />
                        <Route path="/admin/collections" element={<CollectionsManagement />} />
                        <Route path="/admin/collection/detail" element={<CollectionDetail />} />
                        <Route path="/admin/collection/edit" element={<CollectionEdit />} />
                        <Route path="/admin/tags" element={<TagManagement />} />

                        
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
                            </Layout> } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
