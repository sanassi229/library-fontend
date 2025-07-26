// src/pages/admin/BookEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pencil, ChevronRight } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

const BookEdit = () => {
  const navigate = useNavigate();
  const { bookId } = useParams(); // Nếu tồn tại bookId thì đang ở chế độ chỉnh sửa

  const isEditMode = !!bookId;

  // State lưu thông tin sách
  const [bookData, setBookData] = useState({
    name: '',
    id: '',
    category: '',
    author: '',
    publisher: '',
    description: '',
  });

  // Nếu là chỉnh sửa, gọi API hoặc gán dữ liệu mẫu
  useEffect(() => {
    if (isEditMode) {
      // TODO: Replace bằng gọi API lấy chi tiết sách
      setBookData({
        name: 'Tên Sách Mẫu',
        id: bookId,
        category: 'Fantasy, Adventure',
        author: 'J.K. Rowling',
        publisher: 'Bloomsbury',
        description: 'Mô tả mẫu cho sách đang chỉnh sửa...',
      });
    }
  }, [isEditMode, bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditMode) {
      console.log('🔄 Updating book:', bookData);
      // TODO: Gọi API PUT /books/:id
    } else {
      console.log('➕ Creating new book:', bookData);
      // TODO: Gọi API POST /books
    }
    navigate('/admin/books');
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleSave}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium rounded-md px-3 py-1.5"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Thêm
            </button>


            <button
              onClick={() => navigate('/admin/books')}
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium rounded-md px-3 py-1.5"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {isEditMode ? 'Chỉnh sửa Sách' : 'Thêm Sách'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Tên sách:
                <input
                  name="name"
                  type="text"
                  value={bookData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded-md"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                ID:
                <input
                  name="id"
                  type="text"
                  value={bookData.id}
                  onChange={handleChange}
                  readOnly={isEditMode}
                  className="mt-1 w-full border p-2 rounded-md bg-gray-100"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Thể loại:
                <input
                  name="category"
                  type="text"
                  value={bookData.category}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded-md"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Tác giả:
                <input
                  name="author"
                  type="text"
                  value={bookData.author}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded-md"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Nhà xuất bản:
                <input
                  name="publisher"
                  type="text"
                  value={bookData.publisher}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded-md"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Ảnh đại diện:
                <input
                  type="file"
                  name="avatar"
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mô tả:
                <textarea
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded-md h-64 resize-y"
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
