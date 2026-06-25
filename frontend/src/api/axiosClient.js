import axios from 'axios';

// In Docker: Vite proxies /api -> http://backend:3001, so baseURL can be empty
// In dev without Docker: VITE_API_URL=http://localhost:3001 is set explicitly
const baseURL = import.meta.env.VITE_API_URL || '';

const axiosClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('[API Response Error]', {
      url: error.config?.url,
      status: error.response?.status,
      message,
    });
    return Promise.reject(error);
  }
);

export default axiosClient;
