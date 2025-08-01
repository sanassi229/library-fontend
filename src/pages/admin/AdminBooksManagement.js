import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminLayout from '../../components/layout/AdminLayout'; // Import AdminLayout

const BooksManagement = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <AdminLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Quản lý Sách</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          {/* Header với Search và Filter */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 mr-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Books"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filter
            </button>
          </div>

          {/* Action buttons */}
          <div className="mb-4 flex space-x-4">
           <button
            className="flex items-center text-blue-500 hover:text-blue-700 font-medium"
            onClick={() => navigate('/admin/book/edit')}
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interested</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data - Replace with actual data from API */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="radio" name="select-book" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:underline"
                    onClick={() => navigate('/admin/book/detail')}
                  >
                    Bluenose
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="radio" name="select-book" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:underline"
                    onClick={() => navigate('/admin/book/detail')} 
                  >
                    Pennywise
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">40 <span className="text-red-500 text-lg ml-2">❌</span></td>
                </tr>
                {/* ... other rows ... */}
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
              <div className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === 1 ? 'bg-primary-500 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button type="button" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next page
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BooksManagement;
