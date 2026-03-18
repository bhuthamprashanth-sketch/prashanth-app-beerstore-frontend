import axios from 'axios';

// Determine API base URL based on environment
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    return '/api';
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Production
  if (hostname === 'prashanth-app-beerstore.onrender.com') {
    return 'https://prashanth-app-beerstore-backend.onrender.com/api';
  }

  // Staging
  if (hostname === 'prashanth-app-beerstore-stg.onrender.com') {
    return 'https://prashanth-app-beerstore-backend-stg.onrender.com/api';
  }

  // QA
  if (hostname === 'prashanth-app-beerstore-qa1.onrender.com') {
    return 'https://prashanth-app-beerstore-backend-qa1.onrender.com/api';
  }

  // Dev
  if (hostname === 'prashanth-app-beerstore-dev1.onrender.com') {
    return 'https://prashanth-app-beerstore-backend-dev1.onrender.com/api';
  }

  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }

  // Fallback to same URL (frontend serves backend)
  return '/api';
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
