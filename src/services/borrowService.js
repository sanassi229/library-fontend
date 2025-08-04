import api from './api';

export const borrowService = {
  getAllBorrows: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = {
        page,
        limit,
        ...filters
      };
      const response = await api.get('/borrow', { params });
      return response.data;
    } catch (error) {
      console.error('Get all borrows error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi lấy danh sách phiếu mượn' };
    }
  },

  getBorrowById: async (borrowId) => {
    try {
      const response = await api.get(`/borrow/${borrowId}`);
      return response.data;
    } catch (error) {
      console.error('Get borrow by ID error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi lấy thông tin phiếu mượn' };
    }
  },

  createBorrow: async (borrowData) => {
    try {
      const response = await api.post('/borrow', borrowData);
      return response.data;
    } catch (error) {
      console.error('Create borrow error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi tạo phiếu mượn' };
    }
  },

  searchBorrows: async (searchQuery, filters = {}) => {
    try {
      const params = {
        q: searchQuery,
        ...filters
      };
      const response = await api.get('/borrow/search', { params });
      return response.data;
    } catch (error) {
      console.error('Search borrows error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi tìm kiếm phiếu mượn' };
    }
  },

  updateBorrowStatus: async (borrowId, statusData) => {
    try {
      const response = await api.patch(`/borrow/${borrowId}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Update borrow status error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi cập nhật trạng thái phiếu mượn' };
    }
  },

  deleteBorrow: async (borrowId) => {
    try {
      const response = await api.delete(`/borrow/${borrowId}`);
      return response.data;
    } catch (error) {
      console.error('Delete borrow error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi xóa phiếu mượn' };
    }
  },

  userBorrowBooks: async (bookIds) => {
    try {
      const response = await api.post('/api/users/borrow', {
        bookIds: bookIds
      });
      return response.data;
    } catch (error) {
      console.error('User borrow books error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi mượn sách' };
    }
  },

  getUserBorrows: async () => {
    try {
      const response = await api.get('/api/users/my-borrows');
      return response.data;
    } catch (error) {
      console.error('Get user borrows error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi lấy danh sách sách đang mượn' };
    }
  },

  returnBook: async (borrowId, bookId, returnData = {}) => {
    try {
      const response = await api.patch(`/borrow/${borrowId}/status`, {
        status: 'RETURNED',
        returnDate: new Date().toISOString().split('T')[0],
        ...returnData
      });
      return response.data;
    } catch (error) {
      console.error('Return book error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi trả sách' };
    }
  },

  markOverdue: async (borrowId, fineAmount = 0) => {
    try {
      const response = await api.patch(`/borrow/${borrowId}/status`, {
        status: 'overdue',
        fineAmount
      });
      return response.data;
    } catch (error) {
      console.error('Mark overdue error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi đánh dấu quá hạn' };
    }
  },

  getBorrowStatistics: async (dateRange = {}) => {
    try {
      const params = { ...dateRange };
      const response = await api.get('/borrow', { params });
      
      if (response.data.success) {
        const borrows = response.data.borrows || [];
        const summary = response.data.summary || {};
        
        return {
          success: true,
          data: {
            total: summary.totalBorrowed || 0,
            active: summary.totalBorrowed || 0,
            returned: summary.totalReturned || 0,
            overdue: summary.totalOverdue || 0,
            lost: summary.totalLost || 0,
            borrows
          }
        };
      }
      return response.data;
    } catch (error) {
      console.error('Get borrow statistics error:', error);
      throw error.response?.data || { success: false, message: 'Lỗi khi lấy thống kê mượn sách' };
    }
  }
};


const checkBooksAvailability = async (bookIds) => {
    try {
        const response = await api.post('/api/books/check-availability', {
            bookIds: bookIds
        });
        return response.data;
    } catch (error) {
        console.error('Check books availability error:', error);
        throw error.response?.data || { success: false, message: 'Lỗi khi kiểm tra tình trạng sách' };
    }
};

const getBulkBooks = async (bookIds) => {
    try {
        const idsString = bookIds.join(',');
        const response = await api.get(`/api/books/bulk?ids=${idsString}`);
        return response.data;
    } catch (error) {
        console.error('Get bulk books error:', error);
        throw error.response?.data || { success: false, message: 'Lỗi khi lấy thông tin nhiều sách' };
    }
};

export { checkBooksAvailability, getBulkBooks };