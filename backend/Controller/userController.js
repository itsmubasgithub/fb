const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const generateOTP = () => {
  const random = Math.random() * 999999;
  const round = Math.round(random);
  return round;
};

const addData = asyncHandler(async (req, res) => {
  const { f_name, l_name, gender, password, m_mail, dob } = req.body;

  if (!f_name || !l_name || !dob || !gender || !password || !m_mail) {
    res.status(401);
    throw new Error("Please enter all Fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //   and now check the mail

  //   const checkEmail = await userModel.findOne({
  //     m_mail,
  //   });

  //   if (checkEmail) {
  //     res.status(401);
  //     throw new Error("Email Already Exists");
  //   }
  const otp = generateOTP();
  //   check mail;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    },
  });

  const options = {
    from: process.env.MONGO_USER,
    to: m_mail,
    subject: "OTP FOR ACCOUNT VERIFICATION",
    html: `${otp}`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email sent Successfully");
    }
  });

  const createdUser = await userModel.create({
    f_name,
    l_name,
    dob,
    gender,
    m_mail,
    password: hashedPassword,
    otp: generateOTP(),
  });

  res.send({
    _id: createdUser._id,
    f_name: createdUser.f_name,
    l_name: createdUser.l_name,
    gender: createdUser.gender,
    password: createdUser.password,
    m_mail: createdUser.m_mail,
    dob: createdUser.dob,
    otp: createdUser.otp,
    token: generateToken(createdUser._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { m_mail, password } = req.body;

  if (!m_mail || !password) {
    res.status(401);
    throw new Error("Please enter all required fields");
  }

  const checkEmail = await userModel.findOne({
    m_mail,
  });

  if (!checkEmail) {
    res.status(401);
    throw new Error("Invalid Email");
  }

  if (checkEmail && (await bcrypt.compare(password, checkEmail.password))) {
    res.send(checkEmail);
  } else {
    res.status(401);
    throw new Error("Invalid Password");
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const id = req.params.user_id;
  const { otp } = req.body;

  const findUser = await userModel.findById(id);

  if (!findUser) {
    res.status(401);
    throw new Error("User not found");
  }

  if (!otp) {
    res.status(400);
    throw new Error("Please Enter the Otp");
  }

  if (findUser.otp == otp) {
    findUser.otp = null;
    await findUser.save();
    res.send(findUser);
  } else {
    res.status(401);
    throw new Error("Invalid OTP");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const getUsers = await userModel.find();
  res.send(getUsers);
});

// create the tokrn

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30day" });
};
module.exports = {
  addData,
  loginUser,
  verifyOTP,
  getAllUsers,
};
