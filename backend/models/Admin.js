// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const adminSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: [true, 'Please provide a username'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: [true, 'Please provide an email'],
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Please provide a password'],
//       minlength: 8,
//       select: false,
//     },
//     fullName: {
//       type: String,
//       default: 'Admin',
//     },
//     profilePicture: {
//       type: String,
//       default: null,
//     },
//     bio: {
//       type: String,
//       default: 'Prosper Foundation Admin',
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     lastLogin: Date,
//     loginAttempts: {
//       type: Number,
//       default: 0,
//     },
//     lockUntil: Date,
//     permissions: {
//   type: [
//     {
//       type: String,
//       enum: [
//         "manage_blogs",
//         "manage_ebooks",
//         "manage_bookings",
//         "manage_users",
//         "manage_payments",
//         "view_analytics",
//         "manage_settings",
//         "view_comments",
//         "approve_comments",
//         "manage_customers",
//         "manage_testimonials",
//         "approve_testimonials",
//       ],
//     },
//   ],
//   default: [
//     "manage_blogs",
//     "manage_ebooks",
//     "manage_bookings",
//     "manage_users",
//     "manage_payments",
//     "view_analytics",
//     "manage_settings",
//     "view_comments",
//     "approve_comments",
//     "manage_customers",
//     "manage_testimonials",
//     "approve_testimonials",
//   ],
// },
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Match password method
// adminSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Get JWT Token
// adminSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign(
//     {
//       id: this._id,
//       role: "admin",
//       type: "admin",
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRE || "24h",
//     }
//   );
// };
// // Lock account after failed attempts
// adminSchema.methods.incLoginAttempts = async function () {
//   if (this.lockUntil && this.lockUntil < Date.now()) {
//     return this.updateOne({
//       $set: { loginAttempts: 1 },
//       $unset: { lockUntil: 1 },
//     });
//   }

//   const updates = { $inc: { loginAttempts: 1 } };
//   const maxAttempts = 5;
//   const lockTimeInMinutes = 30;

//   if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked()) {
//     updates.$set = {
//       lockUntil: new Date(Date.now() + lockTimeInMinutes * 60 * 1000),
//     };
//   }

//   return this.updateOne(updates);
// };

// // Check if account is locked
// adminSchema.methods.isLocked = function () {
//   return this.lockUntil && this.lockUntil > Date.now();
// };

// // Reset login attempts
// adminSchema.methods.resetLoginAttempts = async function () {
//   return this.updateOne({
//     $set: { loginAttempts: 0 },
//     $unset: { lockUntil: 1 },
//   });
// };

// export default mongoose.model('Admin', adminSchema);



import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username"],
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },

    fullName: {
      type: String,
      default: "Admin",
      trim: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "Prosper Foundation Admin",
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
      default: null,
    },

    permissions: {
      type: [String],

      default: [
        "content.create",
        "content.read",
        "content.update",
        "content.delete",
        "content.publish",
        "content.unpublish",

        "comments.read",
        "comments.approve",
        "comments.reject",
        "comments.delete",

        "users.read",
        "analytics.read",
        "settings.manage",
      ],
    },
  },

  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Password hashing
|--------------------------------------------------------------------------
*/

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});

/*
|--------------------------------------------------------------------------
| Password comparison
|--------------------------------------------------------------------------
*/

adminSchema.methods.matchPassword = async function (
  enteredPassword
) {
  return bcrypt.compare(
    enteredPassword,
    this.password
  );
};

/*
|--------------------------------------------------------------------------
| JWT
|--------------------------------------------------------------------------
*/

adminSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRE || "24h",
    }
  );
};

/*
|--------------------------------------------------------------------------
| Login attempts
|--------------------------------------------------------------------------
*/

adminSchema.methods.incLoginAttempts =
  async function () {
    if (
      this.lockUntil &&
      this.lockUntil < Date.now()
    ) {
      return this.updateOne({
        $set: {
          loginAttempts: 1,
        },
        $unset: {
          lockUntil: 1,
        },
      });
    }

    const updates = {
      $inc: {
        loginAttempts: 1,
      },
    };

    const maxAttempts = 5;

    const lockTime =
      30 * 60 * 1000;

    if (
      this.loginAttempts + 1 >=
        maxAttempts &&
      !this.isLocked()
    ) {
      updates.$set = {
        lockUntil: new Date(
          Date.now() + lockTime
        ),
      };
    }

    return this.updateOne(updates);
  };

/*
|--------------------------------------------------------------------------
| Check lock
|--------------------------------------------------------------------------
*/

adminSchema.methods.isLocked = function () {
  return (
    this.lockUntil &&
    this.lockUntil > Date.now()
  );
};

/*
|--------------------------------------------------------------------------
| Reset attempts
|--------------------------------------------------------------------------
*/

adminSchema.methods.resetLoginAttempts =
  async function () {
    return this.updateOne({
      $set: {
        loginAttempts: 0,
      },

      $unset: {
        lockUntil: 1,
      },
    });
  };

export default mongoose.model(
  "Admin",
  adminSchema
);