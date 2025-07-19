import api from './api';

export const bannerService = {
  getAllBanners: async () => {
    try {
      const response = await api.get('/api/banners');
      return response.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      throw error;
    }
  },

  getBannerById: async (id) => {
    try {
      const response = await api.get(`/api/banners/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching banner:', error);
      throw error;
    }
  },

  addBanner: async (bannerData) => {
    try {
      const response = await api.post('/api/banners', bannerData);
      return response.data;
    } catch (error) {
      console.error('Error adding banner:', error);
      throw error;
    }
  },

  updateBanner: async (id, bannerData) => {
    try {
      const response = await api.put(`/api/banners/${id}`, bannerData);
      return response.data;
    } catch (error) {
      console.error('Error updating banner:', error);
      throw error;
    }
  },

  updateBannerStatus: async (id, status) => {
    try {
      const response = await api.patch(`/api/banners/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating banner status:', error);
      throw error;
    }
  },

  deleteBanner: async (id) => {
    try {
      const response = await api.delete(`/api/banners/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting banner:', error);
      throw error;
    }
  }
};