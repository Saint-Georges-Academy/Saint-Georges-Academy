import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a separate axios instance for auth requests
const authAxios = axios.create({
  baseURL: API_URL
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  // Set up axios interceptor for auth header - runs once
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle 401 errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - clear auth state
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Load user on mount and when token changes
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        try {
          const response = await authAxios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Failed to load user:', error);
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await authAxios.post('/api/auth/login', {
      email,
      password
    });
    
    const { access_token, user: userData } = response.data;
    localStorage.setItem('auth_token', access_token);
    setToken(access_token);
    setUser(userData);
    
    return userData;
  }, []);

  const register = useCallback(async (userData) => {
    const response = await authAxios.post('/api/auth/register', userData);
    
    const { access_token, user: newUser } = response.data;
    localStorage.setItem('auth_token', access_token);
    setToken(access_token);
    setUser(newUser);
    
    return newUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    const response = await axios.put(`${API_URL}/api/auth/me`, profileData);
    setUser(response.data);
    return response.data;
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    await axios.post(`${API_URL}/api/auth/change-password`, {
      current_password: currentPassword,
      new_password: newPassword
    });
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    await axios.post(`${API_URL}/api/auth/request-password-reset`, { email });
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    requestPasswordReset
  }), [user, token, loading, login, register, logout, updateProfile, changePassword, requestPasswordReset]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
