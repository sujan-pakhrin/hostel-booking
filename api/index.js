import express from "express";
import db from "./db.js";
import userRouter from "./route/user.route.js";
import authRouter from "./route/auth.route.js";
import hostelRouter from "./route/hostel.route.js";
import roomRouter from "./route/room.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const port = 8888;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server Listening ${port}`);
});

app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", hostelRouter);
app.use("/api", roomRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: 0,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
