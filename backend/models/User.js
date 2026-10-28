// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please provide a name'],
//       trim: true,
//       maxlength: [50, 'Name cannot be more than 50 characters'],
//     },
//   email: {
//   type: String,
//   required: [true, "Please provide an email"],
//   unique: true,
//   lowercase: true,
//   trim: true,
//   match: [
//     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})$/,
//     "Please provide a valid email",
//   ],
// },
//     phone: {
//       type: String,
//       required: [true, 'Please provide a phone number'],
//     },
//     password: {
//       type: String,
//       required: [true, 'Please provide a password'],
//       minlength: 6,
//       select: false,
//     },
//     avatar: {
//       type: String,
//       default: null,
//     },
//     bio: {
//       type: String,
//       default: '',
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin', 'consultant'],
//       default: 'user',
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     dateOfBirth: {
//       type: Date,
//       default: null,
//     },
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       postalCode: String,
//     },
//     preferences: {
//       newsletter: {
//         type: Boolean,
//         default: true,
//       },
//       notifications: {
//         type: Boolean,
//         default: true,
//       },
//     },
//     lastLogin: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,

      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "consultant"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    preferences: {
      newsletter: {
        type: Boolean,
        default: true,
      },

      notifications: {
        type: Boolean,
        default: true,
      },
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    const salt =
      await bcrypt.genSalt(10);

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

    next();
  }
);

userSchema.methods.matchPassword =
  async function (enteredPassword) {
    return bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

export default mongoose.model(
  "User",
  userSchema
);