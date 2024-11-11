import { createContext, useContext, useState, useCallback } from 'react';
import { login as loginApi, logout as logoutApi } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const login = useCallback(async (credentials) => {
    try {
      const response = await loginApi(credentials);
      setIsAuthenticated(true);
      setUser(response.user);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    logoutApi();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
