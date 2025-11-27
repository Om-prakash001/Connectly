import dotenv from "dotenv";
//load env variables
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./utils/socket.js";
import {connectDB} from "./utils/db.js";

import path from "path";

//for parsing cookies
app.use(cookieParser());

//enable cors for frontend communication
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const __dirname = path.resolve();


app.use(express.json({ limit: "50mb"}));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production" ) {
  app.use(express.static(path.join(__dirname, "../frontEnd/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontEnd/dist/index.html"));
  })

}

// instead of this we use in .env file for security prupose
// const PORT = 5000;
// const DB_PATH =
//   "mongodb+srv://OmPrkashChatApp:MongoKanha123@cluster0.j4sf7wt.mongodb.net/chat-app";


const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});


