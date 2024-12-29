const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // /now decode thr token
    let decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id);
    if (!req.user) {
      console.error("User not found for ID:", decode.id);
      res.status(401);
      throw new Error("User not found");
    }
    next();
  } else {
    res.status(401);
    throw new Error("Session Expired");
  }
});

module.exports = authMiddleware;

// Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzk2ZGQ0ZTc0OTAwYzVkODFkYzc5YiIsImlhdCI6MTczMTgxNjkxNiwiZXhwIjoxNzM0NDA4OTE2fQ.gTEo_O29r-KZYybVsYS2SFKhAAlrZNE1jXK6PdnP_2o
