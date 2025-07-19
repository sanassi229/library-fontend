import api from './api';

export const collectionService = {
  getAllCollections: async () => {
    try {
      const response = await api.get('api/collections');
      return response.data;
    } catch (error) {
      console.error('Error fetching collections:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy danh sách bộ sưu tập'
      };
    }
  },

  getCollectionById: async (id) => {
    try {
      const response = await api.get(`/collections/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching collection by ID:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy thông tin bộ sưu tập'
      };
    }
  },

  searchCollections: async (params) => {
    try {
      const response = await api.get('/collections/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching collections:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi tìm kiếm bộ sưu tập'
      };
    }
  },

  createCollection: async (collectionData) => {
    try {
      const response = await api.post('/collections', collectionData);
      return response.data;
    } catch (error) {
      console.error('Error creating collection:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi tạo bộ sưu tập'
      };
    }
  },

  addBookToCollection: async (collectionId, bookId) => {
    try {
      const response = await api.post(`/collections/${collectionId}/books`, { bookId });
      return response.data;
    } catch (error) {
      console.error('Error adding book to collection:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi thêm sách vào bộ sưu tập'
      };
    }
  },

  removeBookFromCollection: async (collectionId, bookId) => {
    try {
      const response = await api.delete(`/collections/${collectionId}/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing book from collection:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi xóa sách khỏi bộ sưu tập'
      };
    }
  },

  deleteCollection: async (id) => {
    try {
      const response = await api.delete(`/collections/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting collection:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi xóa bộ sưu tập'
      };
    }
  }
};