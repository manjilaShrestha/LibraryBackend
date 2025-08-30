// // // import jwt from 'jsonwebtoken';

// // // export const authenticateToken = (req, res, next) => {
// // //     const authHeader = req.headers['authorization'];
// // //     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

// // //     if (!token) return res.status(401).json({ msg: 'Access denied. No token provided.' });

// // //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// // //         if (err) return res.status(403).json({ msg: 'Invalid token.' });

// // //         req.user = user;
// // //         next();
// // //     });
// // // };

// // // export const authorizeRole = (role) => {
// // //     return (req, res, next) => {
// // //         if (req.user.role !== role) {
// // //             return res.status(403).json({ msg: 'Access denied. Unauthorized role.' });
// // //         }
// // //         next();
// // //     };
// // // };



// // // import jwt from 'jsonwebtoken';

// // // // Middleware to check if token is valid
// // // export const authenticateToken = (req, res, next) => {
// // //     const authHeader = req.headers['authorization'];
// // //     const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

// // //     if (!token) {
// // //         return res.status(401).json({ msg: 'Access denied. No token provided.' });
// // //     }

// // //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
// // //         if (err) {
// // //             return res.status(403).json({ msg: 'Invalid token.' });
// // //         }
// // //         req.user = decodedUser; // decodedUser contains { id, email, role }
// // //         next();
// // //     });
// // // };

// // // // Middleware to check if user has the required role
// // // export const authorizeRole = (...roles) => {
// // //     return (req, res, next) => {
// // //         if (!req.user || !roles.includes(req.user.role)) {
// // //             return res.status(403).json({ msg: 'Access denied. Unauthorized role.' });
// // //         }
// // //         next();
// // //     };
// // // };



// // // middleware/authMiddleware.js
// // import jwt from "jsonwebtoken";

// // export const authenticateToken = (req, res, next) => {
// //   const token = req.headers["authorization"]?.split(" ")[1];
// //   if (!token) return res.status(401).json({ msg: "Access denied, no token" });

// //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// //     if (err) return res.status(403).json({ msg: "Invalid token" });
// //     req.user = user;
// //     next();
// //   });
// // };

// // // Only librarian can access
// // export const authorizeRole = (role) => {
// //   return (req, res, next) => {
// //     if (req.user.role !== role) {
// //       return res.status(403).json({ msg: "Access denied. Librarian only." });
// //     }
// //     next();
// //   };
// // };


// // middleware/authMiddleware.js
// import jwt from "jsonwebtoken";

// export const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) return res.status(401).json({ msg: "Access denied, no token" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ msg: "Invalid token" });
//     req.user = user; // { id, email, role }
//     next();
//   });
// };

// // Accept one or multiple allowed roles
// export const authorizeRole = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ msg: "Access denied. Unauthorized role." });
//     }
//     next();
//   };
// };



import jwt from "jsonwebtoken";

// Verify token
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Access denied, no token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = user; // { id, email, role }
    next();
  });
};

// Authorize by role(s)
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied. Unauthorized role." });
    }
    next();
  };
};
