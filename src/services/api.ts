import axios from 'axios';

const api = axios.create({
  baseURL: 'https://practice-latest.onrender.com/api/v1',
});

export default api;
