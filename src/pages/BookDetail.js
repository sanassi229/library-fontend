import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import './ItemsDetail.css';

const BookDetail = () => {
    const { id } = useParams();

    // Dữ liệu mẫu
    const bookData = {
        id: 11120,
        title: 'Rồng Đỏ',
        author: 'Thomas Harris',
        publisher: 'Nhà xuất bản Nhã Nam',
        collection: 'Trilogy Hannibal',
        genre: 'Kinh dị, Tội phạm',
        tags: 'Kinh điển, trinh thám, giật gân',
        description: '“Rồng Đỏ” là tiểu thuyết đầu tiên trong loạt truyện nổi tiếng về kẻ sát nhân hàng loạt Hannibal Lecter...',
        imageUrls: ['/bìa sách.png',]
    };

    return (
        <Layout>
            <main className="book-detail-page">
                <div className="detail-header">
                    <div className="interest-tabs">
                        <div className="tab active">
                            <img src="/bookmark-solid.svg" alt="Đã quan tâm" className="tab-icon" />
                            <span>Đã quan tâm</span>
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
                            <div className="stat-value">20</div>
                        </div>
                        <div className="stat-divider">
                            <img src="/icons8-vertical-line-100.png" alt="" />
                        </div>
                        <div className="stat-item">
                            <div className="stat-label-group">
                                <img src="/icons8-bookshelf-50.png" alt="còn lại" className="tab-icon" />
                                <span className="stat-label">Còn lại</span>
                            </div>
                            <div className="stat-value">20</div>
                        </div>
                        <Link to="/collections" className="back-button back-button-large">
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
                                    src={bookData.imageUrls[0]}
                                    alt={`${bookData.title} - cover`}
                                    className="book-cover-image"
                                />
                            </div>
                        </div>
                        <div className="info-container">
                            <h1 className="book-title">{bookData.title}</h1>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="info-label">Tác giả:</span>
                                    <span className="info-value author">{bookData.author}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Nhà xuất bản:</span>
                                    <span className="info-value publisher">{bookData.publisher}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Mã sách:</span>
                                    <span className="info-value">{bookData.id}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Bộ sưu tập:</span>
                                    <span className="info-value">{bookData.collection}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Thể loại:</span>
                                    <span className="info-value">{bookData.genre}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Tags:</span>
                                    <span className="info-value">{bookData.tags}</span>
                                </div>
                            </div>
                            <div className="description-section">
                                <h3 className="description-title">Mô tả:</h3>
                                <p className="description-text">{bookData.description}</p>
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
