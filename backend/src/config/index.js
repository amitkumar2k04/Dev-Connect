module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.DB_CONNECTION_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrls: {
        development: ['http://localhost:5173', 'http://localhost:3000'],
        production: ['https://devconnect.solutions', 'https://www.devconnect.solutions']
    }
};
