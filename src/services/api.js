import axios from 'axios';
import { handleApiError } from '../utils/errorHandling';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        const errorMessage = handleApiError(error);
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
