const asyncHandler = require("express-async-handler");
const requestModel = require("../model/requestModel");

const addFriend = asyncHandler(async (req, res) => {
  const to = req.params.to;
  const from = req.user._id;

  const existingRequest = await requestModel.findOne({
    "sendRequests.from": from,
    "sendRequests.to": to,
  });

  if (existingRequest) {
    await requestModel.deleteOne({ _id: existingRequest._id });
    res.status(400);
    throw new Error("Request Cancelled");
  } else {
    //   create a new Friend Request = user1 = bashir = from   to = ali bashir ko req bhaigi or recieved requests is ka olta  ali nai bashir ko

    const newRequest = await requestModel.create({
      sendRequests: [{ from, to }],
      recievedRequests: [{ from: to, to: from }],
    });

    res.send(newRequest);
  }
});

const getMyRequests = asyncHandler(async (req, res) => {
  const id = req.user;
  const myRequests = await requestModel.find({
    "sendRequests.from": id,
  });
  res.send(myRequests);
});

const rejectRequest = asyncHandler(async (req, res) => {
  const { from, to } = req.body;
  const findRequest = await requestModel.findOne({
    "sendRequests.from": from,
    "sendRequests.to": to,
  });

  if (findRequest) {
    await findRequest.deleteOne({ _id: findRequest?._id });
    res.send(findRequest);
  }
});

module.exports = {
  addFriend,
  getMyRequests,
  rejectRequest,
};
