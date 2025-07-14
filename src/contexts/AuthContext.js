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

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          verifyToken();
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
      const response = await apiMethods.get('/auth/me');
      if (response.success) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      clearAuthData();
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

const login = async (email, password) => {
  setAuthLoading(true);
  
  try {
    const response = await apiMethods.post('/auth/login', { 
      email: email.trim().toLowerCase(), 
      password 
    });
    
    // Debug: Log response từ API
    console.log('Raw API response:', response);
    console.log('response.success:', response.success);
    console.log('response.message:', response.message);
    console.log('response.data:', response.data);
    
    if (response.success) {
      const { user: userData, token } = response.data;
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
      
      return { 
        success: true, 
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: userData
      };
    } else {
      console.log('Login failed, returning error message:', response.message);
      return { 
        success: false, 
        message: response.message || ERROR_MESSAGES.LOGIN_REQUIRED 
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    console.log('Error details:', error.error);
    return { 
      success: false, 
      message: error.error || ERROR_MESSAGES.NETWORK_ERROR 
    };
  } finally {
    setAuthLoading(false);
  }
};
  const registerCard = async(userData) => {
    setAuthLoading(true);
    try{
        const {name, email, phone, address, cccd} = userData
        console.log("Registering library card:", userData);

        const response = await apiMethods.post("/auth/register-library-card", {
           name: name.trim(),
        email: email.trim().toLowerCase(), 
        phone: phone.trim(),
        address: address.trim(),
        cccd: cccd.trim()
        });
          if (response.success) {
        const { user: newUser, token, cardId } = response.data;
        
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
        setUser(newUser);
        
        return { 
          success: true, 
          message: response.message || SUCCESS_MESSAGES.REGISTER_SUCCESS,
          user: newUser,
          cardId
        };
      } else {
        return { 
          success: false, 
          error: response.message || 'Registration failed' 
        };
      }
    }catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.error || ERROR_MESSAGES.NETWORK_ERROR 
      };
    } finally {
      setAuthLoading(false);
    }
  }

  const register = async (userData) => {
    setAuthLoading(true);
    
    try {
      const { name, email, password, address } = userData;
      
      const response = await apiMethods.post('/auth/register', { 
        name: name.trim(),
        email: email.trim().toLowerCase(), 
        password,
        address: address.trim(),
      
      });
      
      if (response.success) {
        const { user: newUser, token, cardId } = response.data;
        
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
        setUser(newUser);
        
        return { 
          success: true, 
          message: response.message || SUCCESS_MESSAGES.REGISTER_SUCCESS,
          user: newUser,
          cardId
        };
      } else {
        return { 
          success: false, 
          error: response.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.error || ERROR_MESSAGES.NETWORK_ERROR 
      };
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
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  };

  const refreshAuth = async () => {
    try {
      const response = await apiMethods.get('/auth/me');
      if (response.success) {
        setUser(response.data);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
        return { success: true, user: response.data };
      } else {
        clearAuthData();
        return { success: false, error: 'Failed to refresh auth' };
      }
    } catch (error) {
      console.error('Refresh auth error:', error);
      clearAuthData();
      return { success: false, error: error.error };
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
    registerCard,
    register,
    logout,
    updateUser,
    refreshAuth,
    
    isAdmin,
    isLibrarian,
    isMember,
    canManageBooks,
    canManageUsers,
    hasLibraryCard,
    
    clearAuthData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};