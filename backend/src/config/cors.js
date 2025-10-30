const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = process.env.NODE_ENV === 'production'
            ? ['https://devconnect.solutions', 'https://www.devconnect.solutions']
            : ['http://localhost:5173', 'http://localhost:3000'];
            
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions;
