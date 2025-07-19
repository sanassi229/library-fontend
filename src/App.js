import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import CardRegister from './pages/CardRegister';
import Home from './pages/Home';

// <<< THAY ĐỔI 1: IMPORT COMPONENT CHI TIẾT SÁCH >>>
import CollectionDetail from './pages/CollectionDetail';


// Component Browse giữ nguyên
const Browse = () => (
    <Layout>
        {/* Nội dung component Browse giữ nguyên */}
    </Layout>
);

const Collections = () => (
    <Layout>
        
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Bộ sưu tập
                </h1>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                    {/* Phần tìm kiếm và lọc giữ nguyên */}
                    <div className="relative mb-6">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên sách..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm font-medium text-gray-500 mb-6">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map(char => (
                            <a href="#" key={char} className="hover:text-primary-600 hover:underline">
                                {char}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
                            <span className="flex items-center px-4 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                                <span className="text-sm font-medium text-gray-800">Theo tiêu đề</span>
                            </span>
                            <span className="border-l border-gray-300 h-full"></span>
                            <button className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-r-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <button className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: '#9370DB' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <span>Bộ lọc</span>
                        </button>
                    </div>
                </div>

                {/* ======================= KHU VỰC LƯỚI SÁCH ĐÃ ĐƯỢC SỬA ======================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {[
                        // <<< THAY ĐỔI 2: THÊM `id` VÀO DỮ LIỆU SÁCH >>>
                        { id: 1, title: 'Trọn bộ Trilogy về Hannibal Lecter', desc: 'Trilogy Hannibal gồm Red Dragon, The Silence of the Lambs và Hannibal...', img: '/TrilogyHannibal.png' },
                        { id: 2, title: 'Trọn bộ Trilogy về Hannibal Lecter', desc: 'Trilogy Hannibal gồm Red Dragon, The Silence of the Lambs và Hannibal...', img: '/TrilogyHannibal.png' },
                        { id: 3, title: 'Trọn bộ Trilogy về Hannibal Lecter', desc: 'Trilogy Hannibal gồm Red Dragon, The Silence of the Lambs và Hannibal...', img: '/TrilogyHannibal.png' },
                        { id: 4, title: 'Trọn bộ Trilogy về Hannibal Lecter', desc: 'Trilogy Hannibal gồm Red Dragon, The Silence of the Lambs và Hannibal...', img: '/TrilogyHannibal.png' }
                    ].map((book, index) => (
                        // <<< THAY ĐỔI 3: BỌC CARD SÁCH BẰNG THẺ <Link> >>>
                        <Link key={index} to={`/collections/${book.id}`}>
                            <BookCollectionCard title={book.title} description={book.desc} imageUrl={book.img} />
                        </Link>
                    ))}
                </div>
                {/* ============================================================================== */}<div className="flex justify-center mt-16">
                    <img src="/img_title.svg" alt="Arcadia Logo" className="h-10 w-auto opacity-60" />
                </div>

                {/* === PHÂN TRANG === */}
                <nav className="flex items-center justify-between" aria-label="Pagination">
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                        Previous page
                    </a>
                    <div className="hidden md:flex space-x-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                            <a
                                key={page}
                                href="#"
                                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium ${page === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                {page}
                            </a>
                        ))}
                    </div>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                        Next page
                    </a>
                </nav>
                
            </div>
        </div>
    </Layout>
);

// Component Card với ảnh được thu nhỏ, không bị cắt
const BookCollectionCard = ({ title, description, imageUrl }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
        
        {/* Thêm padding và nền xám nhạt để phần ảnh đẹp hơn */}
        <div className="p-4">
            <div className="overflow-hidden rounded-md bg-gray-100">
                <img
                    src={imageUrl}
                    alt={title}
                    // THAY ĐỔI CHÍNH: Đổi từ object-cover thành object-contain
                    className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        </div>

        {/* Phần nội dung chữ */}
        <div className="px-4 pb-4 flex flex-col flex-grow">
            <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
                <span className="font-semibold">Mô tả:</span> {description}
            </p>
        </div>
    </div>
);

// Các component và function còn lại giữ nguyên
const Profile = () => ( <Layout>{/*...*/}</Layout> );
const BorrowHistory = () => ( <Layout>{/*...*/}</Layout> );
const Admin = () => ( <Layout>{/*...*/}</Layout> );

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} /><Route path="/browse" element={<Browse />} />
                        <Route path="/collections" element={<Collections />} />

                        {/* <<< THAY ĐỔI 4: THÊM ROUTE ĐỘNG CHO TRANG CHI TIẾT >>> */}
                        <Route path="/collections/:id" element={<CollectionDetail />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/card-register" element={<CardRegister />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/borrow-history" element={<BorrowHistory />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="*" element={ <Layout>{/* Nội dung trang 404 */}</Layout> } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;