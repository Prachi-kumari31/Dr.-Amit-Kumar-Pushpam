import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("✅ MongoDB connected");

    // Check whether admin already exists
    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      username: "admin",
      email: "pushpamamit@gmail.com",
      password: "Admin@12345",
      fullName: "Prosper Foundation Admin",
      bio: "Prosper Foundation Administrator",
      isActive: true,
    });

    console.log("================================");
    console.log("✅ ADMIN CREATED");
    console.log("================================");
    console.log("Username:", admin.username);
    console.log("Email:", admin.email);
    console.log("ID:", admin._id);
    console.log("================================");

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Error creating admin:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();