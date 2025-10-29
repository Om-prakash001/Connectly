import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/jwt.js";

export const signup = async (req, res) => {
  //for acessing data from req body
  const { fullName, email, password } = req.body;

  //validation for signup
  try {
    //for checking all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    //check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    //check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //Generating salt and hash password
    const salt = await bcrypt.genSalt(10); //genSalt(10) means 10 rounds of hashing (random string added to password)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //save user to db
      await newUser.save();
      //generate jwt token here
      generateToken(newUser._id, res);
      

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log(" Error in signup controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const {email, password} = req.body;
  try{ 
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message: "Invalid credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if(!isPasswordCorrect){ 
      return res.status(400).json({message: "Invalid credentials"});
    }
    //generate jwt token here
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err){ 
    console.log(" Error in login controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });

  }
};
export const logout = (req, res) => {
  try{
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message: "Logged out successfully"});
  } catch (err){ 
    console.log(" Error in login controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateProfile = async (req, res) => {
  try{
    // 
    const {profilePic} = req.body;
    //  get _id from req.authenticatedUser set in protectRoute middleware
    const userId = req.autheticatedUser._id;

    if(!profilePic){
      return res.status(400).json({message: "Profile picture is required"});
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})

    res.status(200).json(updatedUser);

  } catch(err) {
    console.log("error in update profile: ", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  } 
  

}

export const checkAuth = async (req, res) => {
  try{
    res.status(200).json(req.authenticatedUser);
  } catch (err) {
    console.log("Error in checkAuth controller", err.message);
    res.status(500).json({ message: "Internal Server Error"});
  }
}