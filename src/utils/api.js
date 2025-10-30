import axios from "axios";
import { BASE_URL } from "./constants";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authentication token
api.interceptors.request.use(
  (config) => {
    // Token is already sent via cookies (withCredentials: true)
    // This interceptor can be extended for additional headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check if it's a token expiration issue
      if (error.response?.data?.message?.includes('token') || 
          error.response?.data?.message?.includes('auth')) {
        
        // Attempt to refresh the session
        try {
          // If your backend supports token refresh, implement it here
          // For now, we'll redirect to login
          console.warn('Session expired, please login again');
          
          // Clear any stored user data
          // Dispatch logout action if using Redux
          window.location.href = '/login';
          
          return Promise.reject(error);
        } catch (refreshError) {
          // If refresh fails, redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    // Handle other error responses with proper error messages
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 
                          error.response.data || 
                          'An error occurred';
      
      console.error('API Error:', {
        status: error.response.status,
        message: errorMessage,
        url: error.config?.url
      });

      // Enhance error object with user-friendly message
      error.userMessage = typeof errorMessage === 'string' 
        ? errorMessage 
        : 'Something went wrong';
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response received');
      error.userMessage = 'Network error. Please check your connection.';
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
      error.userMessage = 'An unexpected error occurred';
    }

    return Promise.reject(error);
  }
);

// Helper functions for common API operations
export const apiGet = (url, config = {}) => {
  return api.get(url, config);
};

export const apiPost = (url, data = {}, config = {}) => {
  return api.post(url, data, config);
};

export const apiPatch = (url, data = {}, config = {}) => {
  return api.patch(url, data, config);
};

export const apiPut = (url, data = {}, config = {}) => {
  return api.put(url, data, config);
};

export const apiDelete = (url, config = {}) => {
  return api.delete(url, config);
};

export default api;
