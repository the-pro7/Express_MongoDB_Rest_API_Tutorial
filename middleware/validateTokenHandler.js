const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  // If any token available in the incoming request
  let storedToken = req.cookies?.jwt
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
   let token = authHeader.split(" ")[1] || storedToken;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        // Minor update
        return res.status(401).json({message: 'User is not authorized'})
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
        // Minor update
     return res.status(401).json({message: 'User is not authorized or token is missing'})
    }
  }
});

module.exports = validateToken;
