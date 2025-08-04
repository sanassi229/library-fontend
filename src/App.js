import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import CollectionsDetail from './pages/CollectionsDetail';
import Collections from './pages/Collections';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './components/layout/AdminLayout';
import Register from './pages/Register';
import CardRegister from './pages/CardRegister';
import Browse from './pages/Browse';
import ContactUs from './pages/ContactUs';
import DetailBook from './pages/DetailBook'; // Import component DetailBook mới
import PersonalBookshelf from './pages/PersonalBookshelf'; // Tạo file này trong thư mục pages
import ShoppingCart from './pages/ShoppingCart'; // Tạo file này trong thư mục pages
import Profile from './pages/Profile'; // Import component Profile mới
import BorrowHistory from './pages/BorrowHistory'; // Import component BorrowHistory mới

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
const Admin = () => (<AdminLayout> {/* Sử dụng AdminLayout */}</AdminLayout>);

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
            <Route path="/borrow-history" element={<BorrowHistory />} /> {/* Thêm route cho BorrowHistory */}
            <Route path="/books/:bookId" element={<DetailBook />} />
            <Route path="/bookshelf" element={<PersonalBookshelf />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<CollectionsDetail />} />

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
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;