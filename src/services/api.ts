import axios, { type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://practice-latest.onrender.com/api/v1',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  },
);

export default api;
