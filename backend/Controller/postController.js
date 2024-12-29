const asyncHandler = require("express-async-handler");
const postModel = require("../model/postModel");
const uploadPost = asyncHandler(async (req, res) => {
  const { content, caption, visibility } = req.body;
  const user_id = req.user._id;

  const createdPost = await postModel.create({
    content,
    caption,
    user_id,
    visibility,
  });
  res.send(createdPost);
});

const getPosts = asyncHandler(async (req, res) => {
  const myPosts = await postModel.find();
  res.send(myPosts);
});

const addComment = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { post_id, comment } = req.body;

  const findPost = await postModel.findOne({
    _id: post_id,
  });

  findPost.comments.push({
    user_id,
    comment,
    time: Date.now(),
  });

  await findPost.save();

  res.send(findPost);
});

module.exports = {
  uploadPost,
  getPosts,
  addComment,
};
