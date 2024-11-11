import api from './axios';

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  localStorage.setItem('token', data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
