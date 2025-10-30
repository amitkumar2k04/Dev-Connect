import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle authentication errors
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
