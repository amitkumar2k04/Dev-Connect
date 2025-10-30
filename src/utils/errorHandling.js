export const handleApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        
        // Handle specific error codes
        const errorMessages = {
            400: `Invalid request: ${data.message || 'Bad Request'}`,
            401: 'Please login to continue',
            403: 'You do not have permission to perform this action',
            404: 'Resource not found',
            422: 'Invalid input provided',
            429: 'Too many requests, please try again later'
        };
        
        return errorMessages[status] || 'An unexpected error occurred';
    }
    
    if (error.request) {
        return 'Network error. Please check your connection';
    }
    
    return 'An unexpected error occurred';
};
