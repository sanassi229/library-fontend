import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const Collections = () => (
    <Layout>
        
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Bộ sưu tập
                </h1>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                {/* Tìm kiếm */}
                <div className="relative mb-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                    </span>
                    <input
                    type="text"
                    placeholder="Tìm kiếm theo tên bộ sưu tập..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    />
                </div>

                {/* Lọc theo chữ cái */}
                <div className="flex justify-center flex-wrap gap-1 mb-6 text-sm font-medium">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map((char) => (
                    <button
                        key={char}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                    >
                        {char}
                    </button>
                    ))}
                </div>

                {/* Sort và Filter Button */}
                <div className="flex justify-center space-x-4">
                    <button
                    className="flex items-center px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 13a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    Theo tiêu đề ⬇
                    </button>
                    <button className="flex items-center px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
                    </svg>
                    Bộ lọc
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

                
                <nav className="flex items-center justify-between mt-12" aria-label="Pagination">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                    Previous page
                </a>
                <div className="hidden md:flex space-x-2">
                    {[1, 2, 3, 4, 5].map((page) => (
                    <a
                        key={page}
                        href="#"
                        className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium ${page === 1 ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
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

export default Collections;