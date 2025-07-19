import api from './api';

export const bookService = {
  // Get all books with pagination and filters
  getAllBooks: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.search) queryParams.append('search', params.search);
      if (params.category) queryParams.append('category', params.category);
      if (params.author) queryParams.append('author', params.author);
      
      const response = await api.get(`/api/books?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Get book by ID
  getBookById: async (id) => {
    try {
      const response = await api.get(`/api/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },

  // Search books
  searchBooks: async (query) => {
    try {
      const response = await api.get(`/api/books/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },

  // Get book categories
  getCategories: async () => {
    try {
      const response = await api.get('/api/books/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get popular books
  getPopularBooks: async () => {
    try {
      const response = await api.get('/api/books/popular');
      return response.data;
    } catch (error) {
      console.error('Error fetching popular books:', error);
      throw error;
    }
  },

  // Add new book (admin/librarian only)
  addBook: async (bookData) => {
    try {
      const response = await api.post('/api/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  // Update book (admin/librarian only)
  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/api/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  // Delete book (admin/librarian only)
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