import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pencil, ChevronRight } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

const CollectionEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || 'edit'; // 'add' hoặc 'edit'

  const isAddMode = mode === 'add';

  const [formData, setFormData] = useState({
    name: isAddMode ? '' : 'Bộ Sưu Tập Mẫu',
    id: isAddMode ? '' : 'COLLECTION001',
    description: isAddMode
      ? ''
      : 'Đây là mô tả chi tiết về bộ sưu tập...',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isAddMode) {
      console.log('Gửi dữ liệu tạo mới:', formData);
      // gọi API POST để thêm
    } else {
      console.log('Gửi dữ liệu cập nhật:', formData);
      // gọi API PUT để sửa
    }

    navigate('/admin/collection/detail'); // hoặc quay lại danh sách
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleSave}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium rounded-md px-3 py-1.5 transition-colors duration-200"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Lưu
            </button>

            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium rounded-md px-3 py-1.5"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {isAddMode ? 'Thêm Bộ sưu tập mới' : 'Chỉnh sửa Bộ sưu tập'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Tên bộ sưu tập:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                ID:
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  readOnly={!isAddMode}
                  className={`mt-1 w-full border border-gray-300 p-2 rounded-md ${
                    isAddMode ? '' : 'bg-gray-100 cursor-not-allowed'
                  }`}
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Ảnh đại diện:
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
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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

export default CollectionEdit;
