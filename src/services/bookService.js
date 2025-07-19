import api from './api';

export const bookService = {
  getAllBooks: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
        if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.query) queryParams.append('search', params.query); 
      if (params.alphabet) queryParams.append('alphabet', params.alphabet); 
      if (params.sortBy) queryParams.append('sortBy', params.sortBy); 
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder); 
      if (params.category) queryParams.append('category', params.category);
      if (params.author) queryParams.append('author', params.author);
      
      const response = await api.get(`/api/books?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  getBookById: async (id) => {
    try {
      const response = await api.get(`/api/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },

  searchBooks: async (query) => {
    try {
      const response = await api.get(`/api/books/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/api/books/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getPopularBooks: async () => {
    try {
      const response = await api.get('/api/books/popular');
      return response.data;
    } catch (error) {
      console.error('Error fetching popular books:', error);
      throw error;
    }
  },

  addBook: async (bookData) => {
    try {
      const response = await api.post('/api/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/api/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  deleteBook: async (id) => {
    try {
      const response = await api.delete(`/api/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
};