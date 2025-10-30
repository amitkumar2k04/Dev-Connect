const corsConfig = {
    allowedOrigins: {
        development: ['http://localhost:5173', 'http://localhost:3000'],
        production: ['https://devconnect.solutions', 'https://www.devconnect.solutions']
    },
    corsOptions: {
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        maxAge: 86400 // 24 hours
    }
};

const getCorsOptions = () => {
    const env = process.env.NODE_ENV || 'development';
    const origins = corsConfig.allowedOrigins[env];
    
    return {
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            if (origins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        ...corsConfig.corsOptions
    };
};

module.exports = { corsConfig, getCorsOptions };
