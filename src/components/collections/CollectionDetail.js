import Layout from '../components/layout/Layout';
import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import './CollectionDetail.css';


function CollectionDetail() {
  const { id } = useParams();
  const bookData = {
    id: 11120,
    title: 'Rồng Đỏ',
    author: 'Thomas Harris',
    publisher: 'Nhà xuất bản Nhã Nam',
    collection: 'Trilogy Hannibal',
    genre: 'Kinh dị, Tội phạm',
    tags: 'Kinh điển, trinh thám, giật gân',
    description: '“Rồng Đỏ” là tiểu thuyết đầu tiên trong loạt truyện nổi tiếng về kẻ sát nhân hàng loạt Hannibal Lecter của tác giả Thomas Harris. Cuốn sách theo chân Will Graham – một cựu điều tra viên FBI – khi anh buộc phải hợp tác với Lecter để truy bắt một kẻ giết người nguy hiểm có biệt danh là “Rồng Đỏ”. Với những tình tiết căng thẳng, đậm chất tâm lý tội phạm, Rồng Đỏ không chỉ đưa người đọc vào thế giới u ám và méo mó của kẻ sát nhân, mà còn khắc họa sâu sắc cuộc đấu tranh nội tâm của người săn lùng hắn. Đây là...',
    imageUrls: [ 
      '/hannibal.jpg', 
      '/rong-do.jpg', 
      '/su-im-lang.jpg' 
    ]
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? bookData.imageUrls.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === bookData.imageUrls.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };


  return (
    <Layout>
      <main className="book-detail-page">
        <div className="detail-header">
          <div className="interest-tabs">
            <div className="tab active">
              <div className="tab active">
                <img 
                    src="\bookmark-solid.svg" 
                    alt="Đã quan tâm" 
                    className="tab-icon" 
                />
                <span>Đã quan tâm</span>
                </div>
            </div>
            <div className="tab">
              <img 
                    src="/icons8-return-book-30.png" 
                    alt="Trả" 
                    
                />
                <span>Trả</span>
            </div>
          </div>
          <div className="availability-stats">
            <div className="stat-item">
            <div className="stat-label-group">
                <img 
                src="/icons8-eye-50.png" 
                alt="đang mượn"
                className="tab-icon" 
                />
                <span className="stat-label">Đang mượn</span>
            </div>
                <div className="stat-value">20</div>
            </div>
            <div className="stat-divider"><img 
                    src="/icons8-vertical-line-100.png"/>
            </div>
            <div className="stat-item">
            <div className="stat-label-group">
                <img 
                src="/icons8-bookshelf-50.png" 
                alt="còn lại"
                className="tab-icon" 
                />
                <span className="stat-label">Còn lại</span>
            </div>
                <div className="stat-value">20</div>
            </div>
           <Link to="/collections" className="back-button back-button-large">
                <span>Quay lại</span>
                <img 
                    src="/chevron-right-solid.svg" 
                    alt="Quay lại" 
                    className="back-arrow-icon" 
                />
            </Link>
          </div>
        </div>

        <div className="detail-content-card">
          <div className="detail-grid">
            <div className="cover-container">
              <div className="slider-wrapper">
                <button onClick={goToPrevious} className="slider-button prev">‹</button>
                <img 
                  src={bookData.imageUrls[currentImageIndex]} 
                  alt={`${bookData.title} - cover ${currentImageIndex + 1}`} 
                  className="book-cover-image" 
                />
                <button onClick={goToNext} className="slider-button next">›</button>
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
                <h3 className="description-title">Mô tả:</h3><p className="description-text">{bookData.description}</p>
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
}

export default CollectionDetail;