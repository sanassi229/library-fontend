import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { bookService } from '../services/bookService';

const BookCardPlaceholder = ({ id, title, author, imageUrl, views, likes }) => {
  return (
    <Link to={`/books/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-200 cursor-pointer">
        <div className="relative">
          <img
            src={imageUrl || "https://placehold.co/200x300/e0e0e0/ffffff?text=Book+Cover"}
            alt={title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-2 text-white text-sm">
            <span className="bg-black bg-opacity-50 rounded-full px-2 py-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
              {views}
            </span>
            <span className="bg-black bg-opacity-50 rounded-full px-2 py-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/></svg>
              {likes}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm">{author}</p>
        </div>
      </div>
    </Link>
  );
};

const BookList = ({ books, loading }) => {
  if (loading) {
    return (
      <div className="lg:col-span-4 text-center py-12 text-gray-500">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-lg">Đang tải sách...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="lg:col-span-4 text-center py-12 text-gray-500">
        <p className="text-lg">Không tìm thấy sách nào phù hợp.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      {books.map((book) => (
        <BookCardPlaceholder
          key={book.idbook} 
          id={book.idbook}
          title={book.titlebook} 
          author={book.authorbook} 
          imageUrl={book.imagebook} 
          views={0} 
          likes={0} 
        />
      ))}
    </div>
  );
};

const Browse = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(''); 
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [sortBy, setSortBy] = useState('title'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler); 
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await bookService.getAllBooks({
          query: debouncedSearchQuery, 
          alphabet: selectedAlphabet,
          sortBy: sortBy,
          sortOrder: sortOrder,
          page: currentPage,
          limit: limit,
        });

        if (response.success && response.data) {
          setBooks(response.data.books || []);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setError(response.message || 'Không thể tải sách.');
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Không thể tải sách. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedSearchQuery, selectedAlphabet, sortBy, sortOrder, currentPage, limit]); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleAlphabetClick = (char) => {
    setSelectedAlphabet(selectedAlphabet === char ? '' : char); 
    setCurrentPage(1);
  };

  const handleSortByClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-8 relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-1 mb-8 text-sm font-medium">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map((char) => (
              <button
                key={char}
                onClick={() => handleAlphabetClick(char)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                  selectedAlphabet === char ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-purple-100 hover:text-purple-700'
                }`}
              >
                {char}
              </button>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mb-12">
            <button
              onClick={handleSortByClick}
              className="flex items-center px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 13a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
              Theo tiêu đề {sortOrder === 'asc' ? '⬆' : '⬇'}
            </button>
            <button className="flex items-center px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/></svg>
              Bộ lọc
            </button>
          </div>
          
          <BookList books={books} loading={loading} />

          {totalPages > 0 && (
            <div className="flex justify-center items-center space-x-2 text-gray-700 font-medium">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous page
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === page ? 'bg-purple-600 text-white' : 'hover:bg-gray-200'
                  } transition-colors text-sm`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next page
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
