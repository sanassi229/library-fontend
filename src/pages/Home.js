import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { bookService } from '../services/bookService';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularResponse, latestResponse] = await Promise.all([
          bookService.getPopularBooks(),
          bookService.getAllBooks({ limit: 5, sort: 'latest' })
        ]);
        
        setFeaturedBooks(popularResponse.data || []);
        setLatestBooks(latestResponse.data?.books || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(featuredBooks.length, 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredBooks.length]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section with Carousel */}
        <div className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-pink-900/90"></div>
          
          {featuredBooks.length > 0 && (
            <div 
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredBooks.map((book, index) => (
                <div key={book.idbook || index} className="min-w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="text-white space-y-6">
                          <div className="inline-block">
                            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                              Nổi bật
                            </span>
                          </div>
                          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            {book.titlebook || 'Huyền Tướng Về Bình Thường'}
                          </h1>
                          <p className="text-xl text-blue-100">
                            {book.authorbook || 'Tác giả nổi tiếng'}
                          </p>
                          <p className="text-lg text-blue-200 leading-relaxed">
                            {book.descriptionbook || 'Chúng ta có thật sự ổn? Khám phá những câu chuyện đầy cảm hứng và sâu sắc về cuộc sống hiện đại.'}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-blue-200">
                            <span>⏰ Thời gian: 9:30-11:00, Chủ nhật, ngày 6/7/2025</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-blue-200">
                            <span>📍 Địa điểm: Dova Cafe - 48 Đường số 15, Phường An Phú, TP. Thủ Đức</span>
                          </div>
                          <div className="flex space-x-4">
                            <Link
                              to={`/books/${book.idbook}`}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                              Chi tiết sách
                            </Link>
                            <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold backdrop-blur-sm transition-all duration-300">
                              Mượn ngay
                            </button>
                          </div>
                        </div>
                        <div className="lg:flex justify-center hidden">
                          <div className="relative">
                            <div className="w-80 h-96 bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                              {book.imagebook ? (
                                <img 
                                  src={book.imagebook} 
                                  alt={book.titlebook}
                                  className="w-full h-full object-cover rounded-xl"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                                  <div className="text-center text-white">
                                    <div className="text-6xl mb-4">📚</div>
                                    <div className="font-bold text-xl">ARCADIA</div>
                                    <div className="text-sm opacity-90">LIBRARY</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {featuredBooks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Khám phá thư viện</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/browse" className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📚</div>
                    <div className="font-semibold text-gray-900">Duyệt sách</div>
                    <div className="text-sm text-gray-600">Tìm sách yêu thích</div>
                  </Link>
                  <Link to="/collections" className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📁</div>
                    <div className="font-semibold text-gray-900">Bộ sưu tập</div>
                    <div className="text-sm text-gray-600">Khám phá chủ đề</div>
                  </Link>
                  <Link to="/register" className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📝</div>
                    <div className="font-semibold text-gray-900">Đăng ký</div>
                    <div className="text-sm text-gray-600">Tạo tài khoản</div>
                  </Link>
                  <Link to="/profile" className="group p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">👤</div>
                    <div className="font-semibold text-gray-900">Hồ sơ</div>
                    <div className="text-sm text-gray-600">Quản lý tài khoản</div>
                  </Link>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Đầu sách</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
                  <div className="text-gray-600">Độc giả</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
                  <div className="text-gray-600">Lượt mượn</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
                  <div className="text-gray-600">Hài lòng</div>
                </div>
              </div>
            </div>

            {/* Sidebar - Latest Books */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-green-500 mr-2">⭐</span>
                  Mới nhất
                </h3>
                <div className="space-y-4">
                  {latestBooks.map((book, index) => (
                    <div key={book.idbook || index} className="group cursor-pointer">
                      <Link to={`/books/${book.idbook}`} className="block">
                        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
                          <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            {book.imagebook ? (
                              <img 
                                src={book.imagebook} 
                                alt={book.titlebook}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-center">
                                <div className="text-2xl">📖</div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                              {book.titlebook || `Sách mới ${index + 1}`}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {book.authorbook || 'Tác giả'}
                            </p>
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-green-600 font-medium">
                                Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                
                {latestBooks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">📚</div>
                    <p>Đang cập nhật sách mới...</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <Link 
                    to="/browse"
                    className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Xem tất cả →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;