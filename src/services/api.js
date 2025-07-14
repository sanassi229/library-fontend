import axios from 'axios';
import { 
  API_BASE_URL, 
  STORAGE_KEYS, 
  ERROR_MESSAGES 
} from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', response.config.method?.toUpperCase(), response.config.url, response.status);
    }
    
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);
    
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          
          error.message = ERROR_MESSAGES.UNAUTHORIZED;
          break;
          
        case 403:
          error.message = ERROR_MESSAGES.FORBIDDEN;
          break;
          
        case 404:
          error.message = ERROR_MESSAGES.NOT_FOUND;
          break;
          
        case 422:
          error.message = data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
          break;
          
        case 500:
        case 502:
        case 503:
        case 504:
          error.message = ERROR_MESSAGES.SERVER_ERROR;
          break;
          
        default:
          error.message = data?.message || `HTTP Error ${status}`;
      }
    } else if (error.request) {
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      error.message = error.message || 'Unknown error occurred';
    }
    
    return Promise.reject(error);
  }
);

export const handleApiResponse = (response) => {
  if (response.data?.success) {
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } else {
    throw new Error(response.data?.message || 'API response failed');
  }
};

export const handleApiError = (error) => {
  return {
    success: false,
    error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
    status: error.response?.status
  };
};

export const apiMethods = {
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default api;
export { api };