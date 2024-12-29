const express = require("express");
const {
  uploadPost,
  getPosts,
  addComment,
} = require("../Controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

const postRouter = express.Router();

postRouter.post("/upload-post", authMiddleware, uploadPost);
postRouter.get("/get-posts", getPosts);
postRouter.post("/add-comment", authMiddleware, addComment);

module.exports = postRouter;
