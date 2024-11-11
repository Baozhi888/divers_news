import api from './axios';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error.response?.data?.message || '登录失败';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/auth/check');
    return response.data;
  } catch (error) {
    throw error;
  }
};
