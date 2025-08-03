import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { bookService } from '../services/bookService';
import './ItemsDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookService.getBookById(id);
        if (response.success && response.data) {
          setBookData(response.data);
        } else {
          setError(response.message || 'Không thể tải sách.');
        }
      } catch (err) {
        console.error('Lỗi khi lấy chi tiết sách:', err);
        setError('Lỗi khi tải sách.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        setIsFollowed(true);
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái quan tâm:', error);
      }
    };
    checkFollowStatus();
  }, [id]);

  const handleToggleFollow = async () => {
    try {
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái quan tâm:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải sách...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !bookData) return <div>Không tìm thấy sách.</div>;

  return (
    <Layout>
      <main className="book-detail-page">
        <div className="detail-header">
          <div className="interest-tabs">
            <div
              className={`tab ${isFollowed ? 'active' : ''}`}
              onClick={handleToggleFollow}
              style={{
                border: isFollowed ? '2px solid #2563eb' : 'none',
                color: isFollowed ? '#2563eb' : '#000',
                cursor: 'pointer',
              }}
            >
              <img
                src="/bookmark-solid.svg"
                alt="Quan tâm"
                className="tab-icon"
                style={{ filter: isFollowed ? '' : 'grayscale(100%) brightness(0)' }}
              />
              <span>{isFollowed ? 'Đã quan tâm' : 'Quan tâm'}</span>
            </div>
            <div className="tab">
              <img src="/icons8-return-book-30.png" alt="Trả" />
              <span>Trả</span>
            </div>
          </div>

          <div className="availability-stats">
            <div className="stat-item">
              <div className="stat-label-group">
                <img src="/icons8-eye-50.png" alt="đang mượn" className="tab-icon" />
                <span className="stat-label">Đang mượn</span>
              </div>
              <div className="stat-value">
                {(bookData.quantitybook || 0) - (bookData.availablebook || 0)}
              </div>
            </div>
            <div className="stat-divider">
              <img src="/icons8-vertical-line-100.png" alt="" />
            </div>
            <div className="stat-item">
              <div className="stat-label-group">
                <img src="/icons8-bookshelf-50.png" alt="còn lại" className="tab-icon" />
                <span className="stat-label">Còn lại</span>
              </div>
              <div className="stat-value">{bookData.availablebook || 0}</div>
            </div>
            <Link to="/browse" className="back-button back-button-large">
              <span>Quay lại</span>
              <img src="/chevron-right-solid.svg" alt="Quay lại" className="back-arrow-icon" />
            </Link>
          </div>
        </div>

        <div className="detail-content-card">
          <div className="detail-grid">
            <div className="cover-container">
              <div className="slider-wrapper">
                <img
                  src={bookData.imagebook?.includes('http') ? bookData.imagebook : '/fallback.png'}
                  alt={`${bookData?.titlebook || 'Bìa sách'} - cover`}
                  className="book-cover-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.png';
                  }}
                />
              </div>
            </div>

            <div className="info-container">
              <h1 className="book-title">{bookData.titlebook}</h1>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Tác giả:</span>
                  <span className="info-value author">{bookData.authorbook}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Nhà xuất bản:</span>
                  <span className="info-value publisher">{bookData.publisherbook}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Mã sách:</span>
                  <span className="info-value">{bookData.idbook}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Năm XB:</span>
                  <span className="info-value">{bookData.yearbook}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Thể loại:</span>
                  <span className="info-value">{bookData.categorybook}</span>
                </div>
              </div>
              <div className="description-section">
                <h3 className="description-title">Mô tả:</h3>
                <p className="description-text">{bookData.descriptionbook}</p>
              </div>
              <div className="action-buttons-group">
                <button className="action-button borrow-button">
                  <img src="/icons8-add-book-30.png" alt="Mượn" className="button-icon" />
                  <span>Mượn</span>
                </button>
                <button className="action-button add-button">
                  <span>Thêm vào</span>
                  <img src="/icons8-open-book-50.png" alt="Thêm vào" className="button-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BookDetail;
