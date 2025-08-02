import api from './api';

export const userService = {
    borrowBooks: async (bookIds) => {
        try {
            const response = await api.post('/api/users/borrow', {
                bookIds: bookIds
            });
            return response.data;
        } catch (error) {
            console.error('Borrow books error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi mượn sách' };
        }
    },

    getMyBorrows: async () => {
        try {
            const response = await api.get('/api/users/my-borrows');
            return response.data;
        } catch (error) {
            console.error('Get my borrows error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi lấy danh sách sách đang mượn' };
        }
    },

    getBorrowHistory: async (page = 1, limit = 10, status = null) => {
        try {
            const params = { page, limit };
            if (status) params.status = status;
            
            const response = await api.get('/api/users/borrow-history', { params });
            return response.data;
        } catch (error) {
            console.error('Get borrow history error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi lấy lịch sử mượn sách' };
        }
    },

    getBorrowStatistics: async () => {
        try {
            const response = await api.get('/api/users/borrow-statistics');
            return response.data;
        } catch (error) {
            console.error('Get borrow statistics error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi lấy thống kê mượn sách' };
        }
    },

    renewBook: async (borrowId, bookId, renewDays = 15) => {
        try {
            const response = await api.post(`/api/users/borrows/${borrowId}/books/${bookId}/renew`, {
                renewDays
            });
            return response.data;
        } catch (error) {
            console.error('Renew book error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi gia hạn sách' };
        }
    },

    getUserProfile: async (userId) => {
        try {
            const response = await api.get(`/api/users/${userId}/profile`);
            return response.data;
        } catch (error) {
            console.error('Get user profile error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi lấy thông tin người dùng' };
        }
    },

    updateUserProfile: async (userId, userData) => {
        try {
            console.log('Calling PUT /api/users/profile with data:', userData);
            const response = await api.put('/api/users/profile', userData);
            return response.data;
        } catch (error) {
            console.error('Update user profile error:', error);
            console.error('Error response:', error.response);
            throw error.response?.data || { success: false, message: 'Lỗi khi cập nhật thông tin' };
        }
    },

    searchUsers: async (searchQuery, filters = {}) => {
        try {
            const params = {
                q: searchQuery,
                ...filters
            };
            const response = await api.get('/api/users/search', { params });
            return response.data;
        } catch (error) {
            console.error('Search users error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi tìm kiếm người dùng' };
        }
    },

    getAllUsers: async (page = 1, limit = 10, filters = {}) => {
        try {
            const params = {
                page,
                limit,
                ...filters
            };
            const response = await api.get('/api/users', { params });
            return response.data;
        } catch (error) {
            console.error('Get all users error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi lấy danh sách người dùng' };
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await api.delete(`/api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Delete user error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi xóa người dùng' };
        }
    },

    returnBook: async (borrowId, bookId) => {
        try {
            const response = await api.post(`/api/users/borrows/${borrowId}/books/${bookId}/return`);
            return response.data;
        } catch (error) {
            console.error('Return book error:', error);
            throw error.response?.data || { success: false, message: 'Lỗi khi trả sách' };
        }
    },
};