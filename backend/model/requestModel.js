const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    recievedRequests: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      },
    ],

    sendRequests: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requests", requestSchema);
