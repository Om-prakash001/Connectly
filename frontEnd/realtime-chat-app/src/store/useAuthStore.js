import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:5000"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onLineUsers: [],
  socket: null,

  checkAuth: async () => {
    try{
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data});
      get().connectedSocket()

    } catch(err) {
      console.log("Error in checkAuth:", err);
    } finally{
      set({ isCheckingAuth: false});
    }
  },

  signup: async (data) => {
    set({isSigningUp : true});
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data});
      toast.success("Account created successfully");
      get().connectedSocket()

    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in signup:", error)
    } finally {
      set({isSigningUp: false})
    }
  },

  login: async (data) => {
    set({isLoggingIn : true});
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data});
      toast.success("Logged in successfully");

      get().connectedSocket()

    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error while Logining in :", error)
    } finally {
      set({isLoggingIn: false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("logged out successfully");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfile : true});
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data});
      toast.success("Profile u3pdated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in update profile:", error);
    } finally {
      set({isUpdatingProfile: false})
    }
  },

  connectedSocket : () => {
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      }
    })
    

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({onLineUsers: userIds})
    })

    
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if(socket?.connected){
      socket.disconnect();
    }
  }
}))

