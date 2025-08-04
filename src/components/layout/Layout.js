import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex-shrink-0">
        <Navbar />
      </header>
      <main className="flex-grow w-full">
        {children}
      </main>
      {showFooter && (
        <footer className="flex-shrink-0 w-full">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default Layout;