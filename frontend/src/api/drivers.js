import api from './axios';

export const getDrivers = () => api.get('/drivers').then(res => res.data);
export const createDriver = (data) => api.post('/drivers', data);
export const updateDriver = (id, data) => api.put(`/drivers/${id}`, data);
export const deleteDriver = (id) => api.delete(`/drivers/${id}`);
export const deleteMultipleDrivers = (ids) => api.post('/drivers/batch-delete', { ids });
