export const handleApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                return `Invalid request: ${data.message}`;
            case 401:
                return 'Authentication required. Please login.';
            case 403:
                return 'You do not have permission to perform this action.';
            case 404:
                return 'The requested resource was not found.';
            default:
                return 'An unexpected error occurred. Please try again later.';
        }
    }
    return 'Network error. Please check your connection.';
};
