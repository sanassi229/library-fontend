import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiMethods } from '../services/api';
import { 
  STORAGE_KEYS, 
  SUCCESS_MESSAGES, 
  ERROR_MESSAGES 
} from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const handleApiError = (error) => {
    console.error('API Error:', error);
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        error.error || 
                        ERROR_MESSAGES.NETWORK_ERROR;
    
    return {
      success: false,
      message: errorMessage
    };
  };

  const saveUserData = (userData, token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          await verifyToken();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await apiMethods.get('/api/auth/me');
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
        return { success: true, data: response.data };
      } else {
        clearAuthData();
        return { success: false, message: 'Token không hợp lệ' };
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      clearAuthData();
      return handleApiError(error);
    }
  };

  const login = async (username, password) => {
    if (!username || !password) {
      return {
        success: false,
        message: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu'
      };
    }

    setAuthLoading(true);
    
    try {
      const response = await apiMethods.post('/api/auth/login', { 
        username: username.trim().toLowerCase(), 
        password 
      });
      
      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        saveUserData(userData, token);
        
        return {
          success: true,
          message: response.message || SUCCESS_MESSAGES.LOGIN_SUCCESS,
          user: userData
        };
      }
      
      return {
        success: false,
        message: response.message || 'Đăng nhập thất bại'
      };
      
    } catch (error) {
      return handleApiError(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData) => {
    const { name, email, password, cardId, username } = userData;
    
    if (!name || !email || !password || !cardId || !username) {
      return {
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      };
    }

    setAuthLoading(true);
    
    try {
      const response = await apiMethods.post('/api/auth/register', { 
        name: name.trim(),
        email: email.trim().toLowerCase(), 
        password,
        cardId: cardId.trim().toUpperCase(),
        username: username.trim().toLowerCase()
      });
      
      if (response.success && response.data) {
        const { user: newUser, token } = response.data;
        saveUserData(newUser, token);
        
        return {
          success: true,
          message: response.message || SUCCESS_MESSAGES.REGISTER_SUCCESS,
          user: newUser
        };
      }
      
      return {
        success: false,
        message: response.message || 'Đăng ký tài khoản thất bại'
      };
      
    } catch (error) {
      return handleApiError(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const registerCard = async (userData) => {
    const { name, email, phone, address, cccd } = userData;
    
    if (!name || !email || !phone || !address || !cccd) {
      return {
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      };
    }

    setAuthLoading(true);
    
    try {
      const response = await apiMethods.post('/api/auth/register-card-only', {
        name: name.trim(),
        email: email.trim().toLowerCase(), 
        phone: phone.trim(),
        address: address.trim(),
        cccd: cccd.trim()
      });
      
      if (response.success && response.data) {
        const { cardId, name: cardName, email: cardEmail } = response.data;
        
        return {
          success: true,
          message: response.message || 'Đăng ký thẻ thư viện thành công',
          cardId,
          name: cardName,
          email: cardEmail
        };
      }
      
      return {
        success: false,
        message: response.message || 'Đăng ký thẻ thất bại'
      };
      
    } catch (error) {
      return handleApiError(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const linkCardToAccount = async (cardId) => {
    if (!cardId) {
      return {
        success: false,
        message: 'Vui lòng nhập mã thẻ'
      };
    }

    setAuthLoading(true);
    
    try {
      const response = await apiMethods.post('/api/auth/link-card', {
        cardId: cardId.trim().toUpperCase()
      });
      
      if (response.success) {
        await refreshAuth();
        
        return {
          success: true,
          message: response.message || 'Liên kết thẻ thư viện thành công',
          data: response.data
        };
      }
      
      return {
        success: false,
        message: response.message || 'Liên kết thẻ thất bại'
      };
      
    } catch (error) {
      return handleApiError(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    
    return { 
      success: true, 
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESS 
    };
  };

  const updateUser = (userData) => {
    if (!userData) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    
    return {
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: updatedUser
    };
  };

  const refreshAuth = async () => {
    try {
      const response = await apiMethods.get('/api/auth/me');
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
        
        return { 
          success: true, 
          user: response.data 
        };
      } else {
        clearAuthData();
        return {
          success: false,
          message: 'Không thể làm mới thông tin người dùng'
        };
      }
    } catch (error) {
      clearAuthData();
      return handleApiError(error);
    }
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === 'admin';
  const isLibrarian = user?.role === 'librarian' || isAdmin;
  const isMember = user?.role === 'member';
  const canManageBooks = isLibrarian;
  const canManageUsers = isAdmin;
  const hasLibraryCard = Boolean(user?.cardId);

  const value = {
    user,
    loading,
    authLoading,
    isAuthenticated,
    
    login,
    register,
    registerCard,
    linkCardToAccount,
    logout,
    updateUser,
    refreshAuth,
    verifyToken,
    clearAuthData,
    
    isAdmin,
    isLibrarian,
    isMember,
    canManageBooks,
    canManageUsers,
    hasLibraryCard
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};