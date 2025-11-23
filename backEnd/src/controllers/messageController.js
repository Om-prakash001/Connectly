import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../utils/cloudinary.js";
import {getReciverSocketId, io} from "../utils/socket.js";



export const getUsersForSidebar = async (req, res) => {
  try{
    // extract logged in user id from req.authenticatedUser set in protectRoute middleware
    const loggedInUserId = req.authenticatedUser._id;

    // fetch all users except the logged in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId} }).select("-password"); // $ne means not qual to 
    res.status(200).json(filteredUsers);

  } catch (err){
    console.log("error in getUserForSidebar: ", err.message);
    res.status(500).json({ err: "Internal Server Error" });
  }
} 

export const getMessages = async (req, res) => {
  try{
    const {id:userToChatId} = req.params ; 
    const myId = req.authenticatedUser._id;

    const messages = await Message.find({
      $or:[ //$or operator is used to combine mulitple conditons and at least one condition should be true
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId, receiverId:myId} // myId means authenticated user id and userToChatId means the id of the user with whom authenticated user is chatting 
      ]
    })

    res.status(200).json(messages)
  } catch (err) {
    console.log("error in getMessage controller: ", err.message);
    res.status(500).json({ err: "Internal Server Error" });
  }
}

export const sendMessage = async (req, res) => {
  try{
    const {text, image} = req.body;
    const { id: receiverId} = req.params;
    const senderId = req.authenticatedUser._id;

    let imageUrl;
    if(image){
      //upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //realtime functionality using sockets
    const receiverSocketId = getReciverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
    
  } catch (err) {
    console.log("error in sendMessage controller: ", err.message);
    res.status(500).json({ err: "Internal Server Error" });
  }
}
