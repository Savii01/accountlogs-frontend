import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://serverlogs.test/api', // Set the base URL for your API
  headers: {
    'Content-Type': 'application/json', // Set default content type to JSON
    Accept: 'application/json',
  },
});

// Optional: Attach token for Authorization (if token is available in localStorage)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
