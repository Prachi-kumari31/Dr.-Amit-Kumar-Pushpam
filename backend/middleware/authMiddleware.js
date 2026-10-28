// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication required",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication token missing",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     if (!decoded.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid authentication token",
//       });
//     }

//     const user = await User.findById(decoded.id).select(
//       "-password"
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (!user.isActive) {
//       return res.status(403).json({
//         success: false,
//         message: "User account is inactive",
//       });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.error("User authentication error:", error);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Session expired. Please login again.",
//       });
//     }

//     return res.status(401).json({
//       success: false,
//       message: "Not authorized to access this route",
//     });
//   }
// };



import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (
  req,
  res,
  next
) => {
  let token;

  const authHeader =
    req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer ")
  ) {
    token =
      authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message:
        "Authentication required",
    });
  }

  try {
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is inactive",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "User role is not authorized",
      });
    }

    next();
  };
};