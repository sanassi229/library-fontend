import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const BookEdit = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Saving book data...');
    navigate('/admin/book/detail'); // Ví dụ: điều hướng trở lại trang chi tiết sau khi lưu
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow p-6">

          {/* Các nút hành động: Lưu và Quay lại */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleSave}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium rounded-md px-3 py-1.5 transition-colors duration-200"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Lưu
            </button>

            <button
              onClick={() => navigate('/admin/book/detail')} // Điều hướng trở lại trang chi tiết
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium rounded-md px-3 py-1.5"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Chỉnh sửa Sách</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Tên sách:
                <input
                  type="text"
                  defaultValue="Tên Sách Mẫu"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                ID:
                <input
                  type="text"
                  defaultValue="BOOK12345"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Thể loại:
                <input
                  type="text"
                  defaultValue="Fantasy, Adventure"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Tác giả:
                <input
                  type="text"
                  defaultValue="J.K. Rowling"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Nhà xuất bản:
                <input
                  type="text"
                  defaultValue="Bloomsbury Publishing"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Ảnh bìa:
                <input
                  type="file"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mô tả:
                <textarea
                  defaultValue="Đây là một mô tả chi tiết về cuốn sách. Nó bao gồm tóm tắt nội dung, các giải thưởng đã đạt được, và những thông tin thú vị khác liên quan đến tác phẩm. Cuốn sách này là một ví dụ điển hình về thể loại của nó, thu hút hàng triệu độc giả trên toàn thế giới với cốt truyện hấp dẫn và nhân vật đáng nhớ."
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookEdit;
