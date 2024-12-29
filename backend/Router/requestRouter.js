const express = require("express");
const {
  addFriend,
  getMyRequests,
  rejectRequest,
} = require("../Controller/requestsController");
const authMiddleware = require("../middleware/authMiddleware");

const reqRouter = express.Router();

reqRouter.post("/add-friend-requests/:to", authMiddleware, addFriend);
reqRouter.get("/my-requests/", authMiddleware, getMyRequests);
reqRouter.post("/reject-request", rejectRequest);

module.exports = reqRouter;
