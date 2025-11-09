import express from "express";
import authRoutes from "./routes/authRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


// console.log("JWT SECRET:", process.env.JWT_SECRET);

//intialize express app for backend
const app = express();

//for parsing json data
app.use(express.json());

//for parsing cookies
app.use(cookieParser());

//enable cors for frontend communication
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// instead of this we use in .env file for security prupose
// const PORT = 5000;
// const DB_PATH =
//   "mongodb+srv://OmPrkashChatApp:MongoKanha123@cluster0.j4sf7wt.mongodb.net/chat-app";

//load env variables
dotenv.config();

const PORT = process.env.PORT || 5000;
// connect mongodb using .env file
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server is running  on address http://localhost:${PORT}`);
    });
}).catch (err => {
  console.log("Error connecting to Mongo", err);
});
