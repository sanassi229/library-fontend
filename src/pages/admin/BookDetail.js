import React from 'react';
import { useNavigate } from 'react-router-dom'; // Không cần import BrowserRouter ở đây nữa
import { Pencil, ChevronRight } from 'lucide-react'; // Import icons

// AdminLayout tối giản được nhúng để đảm bảo mã tự chứa và biên dịch được.
// Trong một dự án thực tế, bạn sẽ import nó từ '../../components/layout/AdminLayout'.
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Đây là nơi bạn có thể thêm header, sidebar, v.v. của AdminLayout */}
      <main>{children}</main>
    </div>
  );
};

const BookDetail = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/admin/book/edit'); // Điều hướng đến trang chỉnh sửa sách
  };

  return (
    // Đã loại bỏ <Router> ở đây vì nó đã được cung cấp ở App.js
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow p-6">

          {/* Các nút hành động: Sửa và Quay lại */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleEdit}
              className="flex items-center text-green-600 hover:text-green-800 font-medium rounded-md px-3 py-1.5 transition-colors duration-200"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Sửa
            </button>

            <button
              onClick={() => navigate('/admin/books')} // Điều hướng về trang quản lý sách
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium rounded-md px-3 py-1.5"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Phần chi tiết sách */}
          <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
            {/* Ảnh bìa sách */}
            <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
              <img
                src="https://placehold.co/300x450/E0E0E0/333333?text=Book+Cover" // Ảnh bìa sách giả định
                alt="Book Cover"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              <div className="mt-4 flex justify-around text-center text-gray-700">
                <div className="flex items-center space-x-1">
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7.5 4.5 3.73 7.61 2.45 12c1.28 4.39 5.05 7.5 9.55 7.5s8.27-3.11 9.55-7.5c-1.28-4.39-5.05-7.5-9.55-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  <span>20</span>
                  <span className="text-sm text-gray-500">Đang mượn</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z" />
                  </svg>
                  <span>20</span>
                  <span className="text-sm text-gray-500">Còn lại</span>
                </div>
              </div>
            </div>

            {/* Thông tin sách */}
            <div className="flex-1 space-y-3 text-base">
              <p><strong>Tên sách:</strong> <span className="text-purple-600 font-semibold">Tên Sách Mẫu</span></p>
              <p><strong>ID:</strong> <span className="text-gray-700">BOOK12345</span></p>
              <p><strong>Thể loại:</strong> <span className="text-gray-700">Fantasy, Adventure</span></p>
              <p><strong>Tác giả:</strong> <span className="text-gray-700">J.K. Rowling</span></p>
              <p><strong>Nhà xuất bản:</strong> <span className="text-gray-700">Bloomsbury Publishing</span></p>

              <p className="pt-2"><strong>Mô tả:</strong></p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Đây là một mô tả chi tiết về cuốn sách. Nó bao gồm tóm tắt nội dung, các giải thưởng đã đạt được,
                và những thông tin thú vị khác liên quan đến tác phẩm. Cuốn sách này là một ví dụ điển hình
                về thể loại của nó, thu hút hàng triệu độc giả trên toàn thế giới với cốt truyện hấp dẫn và
                nhân vật đáng nhớ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookDetail;
