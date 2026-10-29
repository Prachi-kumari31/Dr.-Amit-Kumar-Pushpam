// import mongoose from 'mongoose';
// import Admin from '../models/Admin.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const seedAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ username: 'admin' });

//     if (existingAdmin) {
//       console.log('Admin already exists!');
//       console.log('Username: admin');
//       console.log('Email:', existingAdmin.email);
//       await mongoose.connection.close();
//       return;
//     }

//     // Create admin
//     const admin = await Admin.create({
//       username: 'admin',
//       email: 'admin@prosperfoundation.com',
//       password: 'Admin@12345', // Change this to a secure password
//       fullName: 'Dr. Amit Kumar Pushpam',
//       bio: 'Founder & Director, Prosper Foundation',
//       permissions: [
//         'manage_blogs',
//         'manage_ebooks',
//         'manage_bookings',
//         'manage_users',
//         'manage_payments',
//         'view_analytics',
//         'manage_settings',
//         'view_comments',
//         'approve_comments',
//         'manage_customers',
//       ],
//     });

//     console.log('Admin created successfully!');
//     console.log('Username: admin');
//     console.log('Password: Admin@12345');
//     console.log('Email: admin@prosperfoundation.com');

//     await mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding admin:', error);
//     process.exit(1);
//   }
// };

// seedAdmin();


import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    /*
    |--------------------------------------------------------------------------
    | Admin permissions
    |--------------------------------------------------------------------------
    |
    | These permissions must match the permissions used by your
    | admin authorization middleware/routes.
    |
    */

    const permissions = [
      // Content
      "manage_blogs",
      "manage_articles",
      "manage_ebooks",
      "manage_poems",
      "manage_stories",
      "manage_publications",

      // Content actions
      "content.create",
      "content.read",
      "content.update",
      "content.delete",
      "content.publish",
      "content.unpublish",

      // Comments
      "view_comments",
      "approve_comments",
      "reject_comments",
      "delete_comments",

      // Users
      "manage_users",

      // Bookings
      "manage_bookings",

      // Payments
      "manage_payments",

      // Customers
      "manage_customers",

      // Analytics
      "view_analytics",

      // Settings
      "manage_settings",
    ];

    /*
    |--------------------------------------------------------------------------
    | Check if admin already exists
    |--------------------------------------------------------------------------
    */

    let admin = await Admin.findOne({
      username: "admin",
    }).select("+password");

    /*
    |--------------------------------------------------------------------------
    | Create admin if it doesn't exist
    |--------------------------------------------------------------------------
    */

    if (!admin) {
      admin = await Admin.create({
        username: "admin",

        email: "admin@prosperfoundation.com",

        password: "Admin@12345",

        fullName: "Dr. Amit Kumar Pushpam",

        bio: "Founder & Director, Prosper Foundation",

        role: "admin",

        isActive: true,

        permissions,
      });

      console.log("");
      console.log("========================================");
      console.log("      ADMIN CREATED SUCCESSFULLY");
      console.log("========================================");
      console.log("Username: admin");
      console.log("Password: Admin@12345");
      console.log("Email: admin@prosperfoundation.com");
      console.log("========================================");
      console.log("");

    } else {

      /*
      |--------------------------------------------------------------------------
      | Admin already exists
      |--------------------------------------------------------------------------
      |
      | IMPORTANT:
      | We update the permissions here.
      |
      | This is the part your current seed script is missing.
      |--------------------------------------------------------------------------
      */

      admin.permissions = permissions;

      admin.isActive = true;

      await admin.save();

      console.log("");
      console.log("========================================");
      console.log("      EXISTING ADMIN UPDATED");
      console.log("========================================");
      console.log("Username:", admin.username);
      console.log("Email:", admin.email);
      console.log("Permissions updated successfully.");
      console.log("========================================");
      console.log("");
    }

    /*
    |--------------------------------------------------------------------------
    | Display current permissions
    |--------------------------------------------------------------------------
    */

    const updatedAdmin = await Admin.findOne({
      username: "admin",
    }).select("-password");

    console.log("Current Admin Permissions:");

    updatedAdmin.permissions.forEach(
      (permission) => {
        console.log("✓", permission);
      }
    );

    /*
    |--------------------------------------------------------------------------
    | Close MongoDB
    |--------------------------------------------------------------------------
    */

    await mongoose.connection.close();

    console.log("");
    console.log("MongoDB connection closed.");
    console.log("Seed completed successfully.");

    process.exit(0);

  } catch (error) {

    console.error(
      "Error seeding admin:",
      error
    );

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedAdmin();