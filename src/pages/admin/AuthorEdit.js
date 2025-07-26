import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { ChevronRight, Pencil, Plus } from 'lucide-react';

const AuthorEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isCreateMode = queryParams.get('mode') === 'create';

  // State cho các trường input
  const [authorData, setAuthorData] = useState({
    name: '',
    id: '',
    groupId: '',
    dob: '',
    nationality: '',
    bio: '',
    avatar: null,
  });

  // Nếu là chế độ chỉnh sửa thì load dữ liệu mẫu (sau này có thể gọi API lấy dữ liệu từ id)
  useEffect(() => {
    if (!isCreateMode) {
      setAuthorData({
        name: 'J.K Rowling',
        id: 'jkrowling123',
        groupId: 'harrypotter-group',
        dob: '1965-07-31',
        nationality: 'Anh',
        bio: 'J.K. Rowling, tên thật Joanne Rowling...',
        avatar: null,
      });
    }
  }, [isCreateMode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAuthorData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = () => {
    if (isCreateMode) {
      console.log('Tạo mới tác giả:', authorData);
      // call POST API tạo mới
    } else {
      console.log('Cập nhật tác giả:', authorData);
      // call PUT API cập nhật
    }
    navigate('/admin/author/detail');
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
              onClick={() => navigate('/admin/author/detail')}
              className="text-gray-600 hover:text-gray-900 flex items-center font-medium"
            >
              Quay lại
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {isCreateMode ? 'Thêm Tác Giả' : 'Chỉnh sửa tác giả'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">
                Tên tác giả:
                <input
                  type="text"
                  name="name"
                  value={authorData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                ID:
                <input
                  type="text"
                  name="id"
                  value={authorData.id}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
                  readOnly={!isCreateMode}
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Nhóm ID Sách:
                <input
                  type="text"
                  name="groupId"
                  value={authorData.groupId}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Ngày sinh:
                <input
                  type="date"
                  name="dob"
                  value={authorData.dob}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Quốc tịch:
                <input
                  type="text"
                  name="nationality"
                  value={authorData.nationality}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Tiểu sử:
                <textarea
                  name="bio"
                  value={authorData.bio}
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

export default AuthorEdit;
