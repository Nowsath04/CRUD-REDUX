const express = require("express");
const dotenv = require("dotenv").config()
const DBConnection = require("./config/mongodb")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorMiddleware = require("./middleware/error");
const userRouter = require("./routes/userRouter")
const dataRouter = require("./routes/dataRouter")

const port = process.env.PORT || 4001;

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true,               // Allow cookies and other credentials
}));


// routers

app.use("/api/auth", userRouter)
app.use("/api/data", dataRouter)


app.listen(port, () => {
    console.log(`server listening on ${port}`);
})


DBConnection()

app.use(ErrorMiddleware);