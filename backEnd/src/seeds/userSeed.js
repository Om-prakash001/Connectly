import { config } from "dotenv";
import { connectDB } from "../utils/db.js";
import User from "../models/userModel.js";

config();

const seedUsers = [
  // Male Users
  {
    email: "Prakash@example.com",
    fullName: "Prakash sahu",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "Kanha@example.com",
    fullName: "Kanha Pradhan",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "Sujit@example.com",
    fullName: "Sujit Khanda",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "Prabhat@example.com",
    fullName: "Prabhat Rana",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "Pravas@example.com",
    fullName: "Pravas Malik",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "Soumya@example.com",
    fullName: "Soumya Ojha",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "Sobhagya@example.com",
    fullName: "Sobhagya Sahoo",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "Swayam@example.com",
    fullName: "Swayam Panda",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
  },

  // Female Users
  {
    email: "Rasmita@example.com",
    fullName: "Rasmita Nayak",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "Priyanka@example.com",
    fullName: "Priyanka Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "Amrita@example.com",
    fullName: "Amrita Das",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "Pratiksha@example.com",
    fullName: "Pratiksha Rana",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "Roshni@example.com",
    fullName: "Roshni Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "Sruti@example.com",
    fullName: "Sruti Mohanty",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "Aisha@example.com",
    fullName: "Aisha Khan",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();