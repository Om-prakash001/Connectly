import express from "express";
import authRoutes from "./routes/authRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//load env variables
dotenv.config();
// console.log("JWT SECRET:", process.env.JWT_SECRET);

//intialize express app for backend
const app = express();

//for parsing json data
app.use(express.json());

//for parsing cookies
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = 5001;
const DB_PATH =
  "mongodb+srv://OmPrkashChatApp:MongoKanha123@cluster0.j4sf7wt.mongodb.net/chat-app";

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to Mongo");
    app.listen(5001, () => {
      console.log(`Server is running  on address http://localhost:${PORT}`);
    });
}).catch (err => {
  console.log("Error connecting to Mongo", err);
});
