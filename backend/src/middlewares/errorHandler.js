const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }
    
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Authentication required'
        });
    }
    
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;
