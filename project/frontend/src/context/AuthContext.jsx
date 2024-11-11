import { createContext, useContext, useState } from 'react';
import { login as loginApi, logout as logoutApi } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = async (credentials) => {
    const response = await loginApi(credentials);
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    logoutApi();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
