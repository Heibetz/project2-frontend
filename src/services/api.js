import axios from 'axios';

const api = axios.create({
  baseURL: '/api',   // Vite proxy will forward this to http://localhost:8080
  timeout: 10000
});

export default api;
