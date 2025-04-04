//src/lib/api/apiClient.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'react-toastify'; // Changed to react-toastify

// Define error response type
interface ErrorResponse {
  message: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/auth', // Added fallback URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL
    });

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // More specific error messages
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const message = error.response?.data?.message || 'An error occurred';
    
    switch (error.response.status) {
      case 400:
        toast.error(message || 'Invalid request. Please check your input.');
        break;
      case 401:
        toast.error('Unauthorized. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        break;
      case 403:
        toast.error('Access denied.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 422:
        toast.error(message || 'Validation error.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;