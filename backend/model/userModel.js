const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: true,
    },

    l_name: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    dob: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
      default: null,
    },

    m_mail: {
      type: String,
      required: true,
    },

    otp: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
