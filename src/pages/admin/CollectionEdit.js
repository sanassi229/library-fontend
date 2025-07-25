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

const CollectionEdit = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Saving collection data...');
    navigate('/admin/collection/detail'); // Ví dụ: điều hướng trở lại trang chi tiết sau khi lưu
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
              onClick={() => navigate('/admin/collection/detail')} // Điều hướng trở lại trang chi tiết
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium rounded-md px-3 py-1.5"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Chỉnh sửa Bộ sưu tập</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Tên bộ sưu tập:
                <input
                  type="text"
                  defaultValue="Bộ Sưu Tập Mẫu"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                ID:
                <input
                  type="text"
                  defaultValue="COLLECTION001"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
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
                  defaultValue="Đây là mô tả chi tiết về bộ sưu tập. Nó có thể bao gồm chủ đề của bộ sưu tập, các loại sách được nhóm lại, và bất kỳ thông tin đặc biệt nào khác. Bộ sưu tập này được tạo ra để nhóm các tác phẩm có liên quan, giúp người dùng dễ dàng tìm kiếm và khám phá."
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
