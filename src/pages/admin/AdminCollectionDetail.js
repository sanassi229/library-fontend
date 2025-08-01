import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, ChevronRight } from 'lucide-react'; // Import icons

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Đây là nơi bạn có thể thêm header, sidebar, v.v. của AdminLayout */}
      <main>{children}</main>
    </div>
  );
};

const CollectionDetail = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/admin/collection/edit'); // Điều hướng đến trang chỉnh sửa bộ sưu tập
  };

  return (
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
              onClick={() => navigate('/admin/collections')} // Điều hướng về trang quản lý bộ sưu tập
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium rounded-md px-3 py-1.5"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Phần chi tiết bộ sưu tập */}
          <div className="flex items-start mb-6">
            {/* Ảnh bộ sưu tập */}
            <img
              src="https://placehold.co/200x200/E0E0E0/333333?text=Collection" // Ảnh bộ sưu tập giả định
              alt="Collection Cover"
              className="w-48 h-auto object-cover rounded-lg mr-6 shadow-md"
            />

            {/* Thông tin bộ sưu tập */}
            <div className="flex-1 space-y-2 text-base">
              <p><strong>Tên bộ sưu tập:</strong> <span className="text-purple-600 font-semibold">Bộ Sưu Tập Mẫu</span></p>
              <p><strong>ID:</strong> <span className="text-gray-700">COLLECTION001</span></p>
              <p><strong>Số lượng sách:</strong> <span className="text-gray-700">15</span></p>
              <p><strong>Ngày tạo:</strong> <span className="text-gray-700">2023-01-15</span></p>
              
              <p className="pt-2"><strong>Mô tả:</strong></p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Đây là mô tả chi tiết về bộ sưu tập. Nó có thể bao gồm chủ đề của bộ sưu tập,
                các loại sách được nhóm lại, và bất kỳ thông tin đặc biệt nào khác.
                Bộ sưu tập này được tạo ra để nhóm các tác phẩm có liên quan, giúp người dùng
                dễ dàng tìm kiếm và khám phá.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CollectionDetail;
