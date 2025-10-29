import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try{
    // Get jwt from cookies
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({ message: "Unauthorized - No Token Provided"});
    }

    //if token is present, verify it
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if(!decoded){
      return res.status(401).json({ message: "Unauthorized - Invalid Token"});
    }

    //get user from decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
      return res.status(404).json({ message: "User not found"});
    }

    req.authenticatedUser = user; // attach user to request object
    next(); // proceed to next route handler
  } catch(err){
    console.log("Error in authenticatedUserprotectRoute middleware", err.message);
    res.status(500).json({ message: "Server Error" });
  }
}