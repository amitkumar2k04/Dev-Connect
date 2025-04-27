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
require('dotenv').config()

require("./utils/cronjobs");

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",   // Your frontend URL
        credentials : true,                 // Allow cookies if needed
    })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);


const server = http.createServer(app);
initializeSocket(server);


connectDB().then(() => {
    console.log("Database connection enstablished ...");
    // 1st DB connection made then start listening to the API calls
    server.listen(process.env.PORT, () => {
        console.log("server is sucessfully listning on port 5000 .. ");
    });
}).catch(err => {
    console.log("Database cannot be connection ...")
})
