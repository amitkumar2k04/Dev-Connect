const errorHandler = (err, req, res, next) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error:`, err);

    const errorResponse = {
        status: 'error',
        timestamp,
        path: req.path,
        method: req.method
    };

    if (err.name === 'ValidationError') {
        errorResponse.code = 400;
        errorResponse.message = 'Validation Error';
        errorResponse.details = Object.values(err.errors).map(e => e.message);
    } else if (err.name === 'UnauthorizedError') {
        errorResponse.code = 401;
        errorResponse.message = 'Authentication required';
    } else {
        errorResponse.code = 500;
        errorResponse.message = 'Internal Server Error';
        if (process.env.NODE_ENV === 'development') {
            errorResponse.error = err.message;
            errorResponse.stack = err.stack;
        }
    }

    res.status(errorResponse.code).json(errorResponse);
};

module.exports = errorHandler;
