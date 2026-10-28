// import jwt from 'jsonwebtoken';
// import Admin from '../models/Admin.js';

// export const adminProtect = async (req, res, next) => {
//   let token;

//   // Check for token in headers
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   // Check for token in cookies
//   if (!token && req.cookies.adminToken) {
//     token = req.cookies.adminToken;
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized to access this route',
//     });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if admin still exists
//     const admin = await Admin.findById(decoded.id);

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found',
//       });
//     }

//     // Check if admin is active
//     if (!admin.isActive) {
//       return res.status(403).json({
//         success: false,
//         message: 'Admin account is inactive',
//       });
//     }

//     req.admin = {
//       id: decoded.id,
//       role: decoded.role,
//       permissions: admin.permissions,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized to access this route',
//     });
//   }
// };

// // Check admin permissions
// export const authorize = (...permissions) => {
//   return (req, res, next) => {
//     if (!req.admin) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized',
//       });
//     }

//     const hasPermission = permissions.some((permission) =>
//       req.admin.permissions.includes(permission)
//     );

//     if (!hasPermission) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have permission to access this resource',
//       });
//     }

//     next();
//   };
// };

// // Check if super admin
// export const isSuperAdmin = (req, res, next) => {
//   if (req.admin.role !== 'super_admin') {
//     return res.status(403).json({
//       success: false,
//       message: 'Only super admin can access this resource',
//     });
//   }

//   next();
// };

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// export const adminProtect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Admin authentication required",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Admin token missing",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     if (!decoded.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid admin token",
//       });
//     }

//     if (decoded.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin access required",
//       });
//     }

//     const adminUser = await Admin.findById(decoded.id).select(
//       "-password"
//     );

//     if (!adminUser) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin not found",
//       });
//     }

//     if (!adminUser.isActive) {
//       return res.status(403).json({
//         success: false,
//         message: "Admin account is inactive",
//       });
//     }

//     req.admin = adminUser;

//     next();
//   } catch (error) {
//     console.error("Admin authentication error:", error);

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Admin session expired",
//       });
//     }

//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid admin token",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Admin authentication failed",
//     });
//   }
// };

// export const admin = (req, res, next) => {
//   if (!req.admin) {
//     return res.status(403).json({
//       success: false,
//       message: "Admin access required.",
//     });
//   }

//   next();
// };


//  // Check admin permissions
// export const authorize = (...permissions) => {
//   return (req, res, next) => {
//     if (!req.admin) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized',
//       });
//     }

//     const hasPermission = permissions.some((permission) =>
//       req.admin.permissions.includes(permission)
//     );

//     if (!hasPermission) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have permission to access this resource',
//       });
//     }

//     next();
//   };
// };


// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// export const adminProtect = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const authHeader =
//       req.headers.authorization;

//     if (
//       !authHeader ||
//       !authHeader.startsWith(
//         "Bearer "
//       )
//     ) {
//       return res.status(401).json({
//         success: false,
//         message:
//           "Admin authentication required",
//       });
//     }

//     const token =
//       authHeader.split(" ")[1];

//     const decoded =
//       jwt.verify(
//         token,
//         process.env.JWT_SECRET
//       );

//     if (
//       decoded.role !== "admin"
//     ) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Admin access required",
//       });
//     }

//     const admin =
//       await Admin.findById(decoded.id);

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin not found",
//       });
//     }

//     if (!admin.isActive) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Admin account is inactive",
//       });
//     }

//     req.admin = admin;

//     next();
//   } catch (error) {
//     console.error(
//       "Admin authentication error:",
//       error
//     );

//     return res.status(401).json({
//       success: false,
//       message:
//         "Invalid or expired admin session",
//     });
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | Permission middleware
// |--------------------------------------------------------------------------
// */

// export const authorize = (
//   requiredPermission
// ) => {
//   return (req, res, next) => {
//     if (!req.admin) {
//       return res.status(401).json({
//         success: false,
//         message:
//           "Admin authentication required",
//       });
//     }

//     if (
//       !req.admin.permissions.includes(
//         requiredPermission
//       )
//     ) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "You do not have permission for this action",
//       });
//     }

//     next();
//   };
// };


// export const admin = (req, res, next) => {
//   if (!req.admin) {
//     return res.status(403).json({
//       success: false,
//       message: "Admin access required.",
//     });
//   }

//   next();
// };


import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/*
|--------------------------------------------------------------------------
| Permission Mapping
|--------------------------------------------------------------------------
|
| Your database currently stores permissions like:
|
| manage_blogs
| manage_ebooks
| manage_users
|
| But some routes use:
|
| content.create
| content.update
| content.delete
|
| This mapping allows both systems to work.
|--------------------------------------------------------------------------
*/

const permissionAliases = {
  "content.create": [
    "content.create",
    "manage_blogs",
  ],

  "content.read": [
    "content.read",
    "manage_blogs",
  ],

  "content.update": [
    "content.update",
    "manage_blogs",
  ],

  "content.delete": [
    "content.delete",
    "manage_blogs",
  ],

  "content.publish": [
    "content.publish",
    "manage_blogs",
  ],

  "content.unpublish": [
    "content.unpublish",
    "manage_blogs",
  ],

  "comments.read": [
    "comments.read",
    "view_comments",
  ],

  "comments.approve": [
    "comments.approve",
    "approve_comments",
  ],

  "comments.reject": [
    "comments.reject",
    "approve_comments",
  ],

  "comments.delete": [
    "comments.delete",
    "view_comments",
  ],

  "users.read": [
    "users.read",
    "manage_users",
  ],

  "analytics.read": [
    "analytics.read",
    "view_analytics",
  ],

  "settings.manage": [
    "settings.manage",
    "manage_settings",
  ],
};

/*
|--------------------------------------------------------------------------
| Admin Authentication
|--------------------------------------------------------------------------
*/

export const adminProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    /*
    |--------------------------------------------------------------------------
    | Authorization header
    |--------------------------------------------------------------------------
    */

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin token missing",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Verify token
    |--------------------------------------------------------------------------
    */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded admin token:", decoded);

    /*
    |--------------------------------------------------------------------------
    | Check role
    |--------------------------------------------------------------------------
    */

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Find admin
    |--------------------------------------------------------------------------
    */

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check active account
    |--------------------------------------------------------------------------
    */

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Attach admin
    |--------------------------------------------------------------------------
    */

    req.admin = admin;

    console.log("Authenticated admin:", {
      id: admin._id,
      username: admin.username,
      role: admin.role,
      permissions: admin.permissions,
    });

    next();

  } catch (error) {
    console.error(
      "Admin authentication error:",
      error
    );

    if (
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Admin session expired. Please login again.",
      });
    }

    if (
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid admin token. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired admin session",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Permission Authorization
|--------------------------------------------------------------------------
*/

export const authorize = (
  requiredPermission
) => {
  return (req, res, next) => {

    try {

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message:
            "Admin authentication required",
        });
      }

      const adminPermissions =
        Array.isArray(
          req.admin.permissions
        )
          ? req.admin.permissions
          : [];

      /*
      |--------------------------------------------------------------------------
      | Get allowed aliases
      |--------------------------------------------------------------------------
      */

      const allowedPermissions =
        permissionAliases[
          requiredPermission
        ] || [requiredPermission];

      console.log(
        "Required permission:",
        requiredPermission
      );

      console.log(
        "Allowed permissions:",
        allowedPermissions
      );

      console.log(
        "Admin permissions:",
        adminPermissions
      );

      /*
      |--------------------------------------------------------------------------
      | Check permission
      |--------------------------------------------------------------------------
      */

      const hasPermission =
        allowedPermissions.some(
          (permission) =>
            adminPermissions.includes(
              permission
            )
        );

      if (!hasPermission) {

        console.error(
          `Permission denied: ${requiredPermission}`
        );

        return res.status(403).json({
          success: false,
          message:
            "You do not have permission for this action",

          requiredPermission,

          allowedPermissions,

          currentPermissions:
            adminPermissions,
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Permission granted
      |--------------------------------------------------------------------------
      */

      console.log(
        `Permission granted: ${requiredPermission}`
      );

      next();

    } catch (error) {

      console.error(
        "Authorization error:",
        error
      );

      return res.status(403).json({
        success: false,
        message:
          "Permission verification failed",
      });
    }
  };
};

/*
|--------------------------------------------------------------------------
| Basic Admin Middleware
|--------------------------------------------------------------------------
*/

export const admin = (
  req,
  res,
  next
) => {

  if (!req.admin) {
    return res.status(403).json({
      success: false,
      message:
        "Admin access required",
    });
  }

  next();
};