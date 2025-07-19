import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { bookService } from '../services/bookService';
import { bannerService } from '../services/bannerService.js';
import { collectionService } from '../services/collectionService.js';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionsRef = useRef(null);
  const [bannerHeight, setBannerHeight] = useState('400px');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [bannersResponse, popularResponse, collectionsResponse, categoriesResponse] = await Promise.all([
          bannerService.getAllBanners(),
          bookService.getPopularBooks(),
          collectionService.getAllCollections(),
          bookService.getCategories()
        ]);

        if (bannersResponse.success && bannersResponse.data) {
          setBanners(bannersResponse.data);
        }

        if (popularResponse.success && popularResponse.data) {
          setPopularBooks(popularResponse.data);
        }

        if (collectionsResponse.success && collectionsResponse.data) {
          setCollections(collectionsResponse.data.slice(0, 3));
        }

        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(categoriesResponse.data.slice(0, 6));
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners.length]);

  useEffect(() => {
    if (!loading && collectionsRef.current) {
      const height = collectionsRef.current.offsetHeight;
      setBannerHeight(`${height}px`);
    }
  }, [loading, collections]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Thử lại
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 flex flex-col">
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-center text-purple-500 mb-2">Nổi bật</h2>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white" style={{ height: bannerHeight }}>
                {banners.length > 0 ? (
                  <>
                    <div
                      className="flex transition-transform duration-1000 ease-in-out h-full"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {banners.map((banner, index) => (
                        <div key={banner.idbanner} className="min-w-full h-full relative">
                          {banner.imagebanner ? (
                            <img
                              src={banner.imagebanner}
                              alt={banner.titlebanner}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-800"></div>
                          )}
                          <div className="relative z-10 h-full flex items-center p-8">
                            <div className="text-white max-w-2xl">
                              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                                {banner.titlebanner}
                              </h1>
                              {banner.subtitlebanner && (
                                <p className="text-xl mb-4 opacity-90">{banner.subtitlebanner}</p>
                              )}
                              {banner.descriptionbanner && (
                                <p className="text-lg mb-6">{banner.descriptionbanner}</p>
                              )}
                              <div className="flex space-x-4">
                                {banner.linkbanner ? (
                                  <Link
                                    to={banner.linkbanner}
                                    className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                  >
                                    Tìm hiểu thêm
                                  </Link>
                                ) : (
                                  <Link
                                    to="/browse"
                                    className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                  >
                                    Xem sách liên quan
                                  </Link>
                                )}
                                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-sm transition-colors">
                                  Khám phá ngay
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {banners.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {banners.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              currentSlide === index
                                ? 'bg-white'
                                : 'bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h1 className="text-4xl font-bold mb-4">📚 Thư viện số hiện đại</h1>
                      <p className="text-xl mb-6">Khám phá hàng nghìn đầu sách phong phú</p>
                      <Link
                        to="/browse"
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Bắt đầu khám phá
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-center text-green-500 mb-2">Mới nhất</h2>
              </div>
              <div className="space-y-4" ref={collectionsRef}>
                {collections.length > 0 ? (
                  collections.map((collection) => (
                    <Link
                      key={collection.idcollection}
                      to={`/collections/${collection.idcollection}`}
                      className="block bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-30 h-24 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                          {collection.imagecollection ? (
                            <img
                              src={collection.imagecollection}
                              alt={collection.namecollection}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400 text-3xl">📚</div>)}
                        </div>

                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-green-600 transition-colors line-clamp-2 mb-1">
                            {collection.namecollection}
                          </h4>
                          <div className="text-xs text-gray-500">
                            Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-white rounded-xl shadow">
                    <div className="text-4xl mb-4">📚</div>
                    <p>Đang cập nhật bộ sưu tập mới...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;