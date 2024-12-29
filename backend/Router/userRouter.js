const express = require("express");
const {
  addData,
  loginUser,
  verifyOTP,
  getAllUsers,
} = require("../Controller/userController");

const userRouter = express();

userRouter.post("/register", addData);
userRouter.post("/entered", loginUser);
userRouter.post("/verify-otp/:user_id", verifyOTP);
userRouter.get("/get-all-users", getAllUsers);

module.exports = userRouter;
