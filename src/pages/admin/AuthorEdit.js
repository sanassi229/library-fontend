import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { ChevronRight, Pencil } from 'lucide-react'; // Import Pencil icon

const AuthorEdit = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Saving author data...');
    navigate('/admin/author/detail'); // Example: navigate back to the detail page
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow p-6">

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleSave}
              className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Sửa
            </button>

            {/* Cập nhật: Nút "Quay lại" từ Edit sẽ về trang Detail */}
            <button
              onClick={() => navigate('/admin/author/detail')}
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Chỉnh sửa tác giả</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Tên tác giả:
                <input
                  type="text"
                  defaultValue="J.K Rowling"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                ID:
                <input
                  type="text"
                  defaultValue="jkrowling123"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Nhóm ID Sách:
                <input
                  type="text"
                  defaultValue="harrypotter-group"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Ngày sinh:
                <input
                  type="date"
                  defaultValue="1965-07-31"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Quốc tịch:
                <input
                  type="text"
                  defaultValue="Anh"
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Tiểu sử:
                <textarea
                  defaultValue="J.K. Rowling, tên thật Joanne Rowling, sinh ngày 31 tháng 7 năm 1965, là nhà văn người Anh nổi tiếng với bộ truyện giả tưởng Harry Potter. Từ một tuổi thơ đầy biến cố và giai đoạn khó khăn sau khi mẹ mất, bà đã hình thành ý tưởng về thế giới phù thủy trên một chuyến tàu. Sau nhiều lần bị từ chối, cuốn sách đầu tiên 'Harry Potter và Hòn đá phù thủy' được xuất bản năm 1997, mở ra một hiện tượng toàn cầu với bảy tập truyện, mang lại cho bà danh tiếng và tài sản khổng lồ. Bà còn là nhà hoạt động từ thiện tích cực, đặc biệt trong lĩnh vực chống đói nghèo và phúc lợi trẻ em."
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

export default AuthorEdit;