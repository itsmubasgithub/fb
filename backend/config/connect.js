const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(
    `Mongoose has been connected : ${mongoose.connection.host.yellow} `
  );
};

module.exports = connectDB;
