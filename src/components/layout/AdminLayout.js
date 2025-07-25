import React from 'react';
import AdminNavbar from './AdminNavbar'; // ✅ Đổi lại từ Navbar -> AdminNavbar
import Footer from './Footer';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex-shrink-0">
        <AdminNavbar /> {/* ✅ Navbar riêng cho admin */}
      </header>
      <main className="flex-grow w-full bg-gray-100">
        {children}
      </main>
      <footer className="flex-shrink-0 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default AdminLayout;
