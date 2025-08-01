import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { Pencil, ChevronRight } from 'lucide-react'; // Import ChevronRight icon

const AuthorDetail = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/admin/author/edit');
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow p-6"> 

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleEdit}
              className="flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Sửa
            </button>

            <button
              onClick={() => navigate('/admin/authors')}
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="flex items-start mb-6">
            <img
              src="/JKR.jpg"
              alt="Author J.K. Rowling"
              className="w-48 h-auto object-cover rounded-lg mr-6 shadow-md"
            />

            <div className="flex-1 space-y-2 text-base">
              <p><strong>Tác giả:</strong> <span className="text-purple-600 font-semibold">J.K Rowling</span></p>
              <p><strong>Tên thật:</strong> Joanne Rowling</p>
              <p><strong>Ngày sinh:</strong> 31 tháng 7 năm 1965</p>
              <p><strong>Quốc tịch:</strong> Anh</p>
              <p><strong>Tác phẩm nổi bật:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Loạt truyện Harry Potter</li>
                <li>Loạt tiểu thuyết Cormoran Strike</li>
              </ul>

              <p className="pt-2"><strong>Tiểu sử:</strong></p>
              <p className="text-sm text-gray-700 leading-relaxed">
                J.K. Rowling, tên thật Joanne Rowling, sinh ngày 31 tháng 7 năm 1965, là nhà văn
                người Anh nổi tiếng với bộ truyện giả tưởng Harry Potter. Từ một tuổi thơ đầy biến cố và
                giai đoạn khó khăn sau khi mẹ mất, bà đã hình thành ý tưởng về thế giới phù thủy trên
                một chuyến tàu. Sau nhiều lần bị từ chối, cuốn sách đầu tiên "Harry Potter và Hòn đá
                phù thủy" được xuất bản năm 1997, mở ra một hiện tượng toàn cầu với bảy tập truyện,
                mang lại cho bà danh tiếng và tài sản khổng lồ. Bà còn là nhà hoạt động từ thiện tích
                cực, đặc biệt trong lĩnh vực chống đói nghèo và phúc lợi trẻ em.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Nổi bật</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              <div className="flex-none w-36 p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-center">
                <img
                  src="/bìa sách.png"
                  alt="Harry Potter and the Sorcerer's Stone"
                  className="w-full h-auto object-cover rounded mb-2 shadow-sm"
                />
                <p className="font-semibold text-sm text-gray-800 leading-tight mb-1">Harry Potter và Hòn đá Phù thủy</p>
                <p className="text-xs text-gray-600">J.K. Rowling</p>
              </div>
              <div className="flex-none w-36 p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-center">
                <img
                  src="/bìa sách.png"
                  alt="Harry Potter and the Chamber of Secrets"
                  className="w-full h-auto object-cover rounded mb-2 shadow-sm"
                />
                <p className="font-semibold text-sm text-gray-800 leading-tight mb-1">Harry Potter và Phòng chứa Bí mật</p>
                <p className="text-xs text-gray-600">J.K. Rowling</p>
              </div>
              <div className="flex-none w-36 p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-center">
                <img
                  src="/bìa sách.png"
                  alt="Harry Potter and the Prisoner of Azkaban"
                  className="w-full h-auto object-cover rounded mb-2 shadow-sm"
                />
                <p className="font-semibold text-sm text-gray-800 leading-tight mb-1">Harry Potter và Tên tù ngục Azkaban</p>
                <p className="text-xs text-gray-600">J.K. Rowling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuthorDetail;