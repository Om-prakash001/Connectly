import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/authController.js';
import {protectRoute} from '../middleware/authMiddleware.js';
// import { updateProfile } from '../controllers/userController.js';
 
const router = express.Router();


router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile); // protectRoute middleware to be implemented for blocked everyone to access this route (i.e updateProfile only for logged in users(i.e authenticated users))

router.get("/check", protectRoute, checkAuth);
export default router;


