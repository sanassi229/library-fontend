import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

const TagManagement = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    console.log('Tag mới:', newTag); // TODO: Gọi API thêm tag ở đây
    setShowModal(false);
    setNewTag('');
  };

  return (
    <AdminLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Quản lý Tags</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 mr-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Tags"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filter
            </button>
          </div>

          {/* Action buttons */}
          <div className="mb-4 flex space-x-4">
            <button
              className="flex items-center text-blue-500 hover:text-blue-700 font-medium"
              onClick={() => setShowModal(true)}
            >
              <img src="/ei_plus.svg" alt="Thêm" className="w-5 h-5 mr-1" />
              Thêm
            </button>

            <button className="flex items-center text-red-500 hover:text-red-700 font-medium">
              <img src="/lsicon_minus-outline.svg" alt="Xóa" className="w-5 h-5 mr-1" />
              Xóa
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="radio" name="select-tag" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Kinh dị</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="radio" name="select-tag" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Khoa học viễn tưởng</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:block">
              <button type="button" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                Previous page
              </button>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <div className="relative z-0 inline-flex shadow-sm -space-x-px">
                {[1, 2, 3, 4].map(page => (
                  <button
                    key={page}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === 1 ? 'bg-blue-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next page
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Thêm Tag mới</h2>
            <input
              type="text"
              placeholder="Nhập tên tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default TagManagement;
