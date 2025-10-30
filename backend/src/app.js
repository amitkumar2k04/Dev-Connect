const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
const paymentRouter = require("./routes/payment");
const http = require ("http");
const initializeSocket = require ("./utils/socket");
const chatRouter = require("./routes/chat");
const errorHandler = require("./middlewares/errorHandler");
require('dotenv').config()

require("./utils/cronjobs");

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://devconnect.solutions', 'https://www.devconnect.solutions']
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

const server = http.createServer(app);
initializeSocket(server);


connectDB().then(() => {
    console.log("Database connection enstablished ...");
    // 1st DB connection made then start listening to the API calls
    server.listen(process.env.PORT, () => {
        console.log("server is sucessfully listning on port 5000 .. ");
    });
}).catch(err => {
    console.log("Database cannot be connection ...", err.message)
})
