import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FaGlobeAsia } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaLock } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";

import { LuDot } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { BiLogoWhatsapp } from "react-icons/bi";
import { IoChatbubbleOutline, IoSend } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import { FiThumbsUp } from "react-icons/fi";
import PostPopover from "./PostPopover";
import { useState } from "react";
import ModalPopup from "./ModalPopup";
import { addCommentData } from "../../features/posts/postSlice";

const MyPost = ({ _id, createdAt, visibility, content, caption, comments }) => {
  const { user } = useSelector((state) => state.user);
  const { commentLoading } = useSelector((state) => state.posts);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const [tempComments, setTempComments] = useState(comments);
  const dispatch = useDispatch();
  const addComment = () => {
    const postData = {
      comment,
      post_id: _id,
    };
    dispatch(addCommentData(postData));
  };

  return (
    <>
      <div className="card   border-0 shadow my-2">
        <div className="d-flex p-3 pb-1 justify-content-between align-items-center">
          <div className="d-flex  gap-2 align-items-center">
            <img
              src={user?.image ? user?.image : "/icons/user.png"}
              width={40}
              height={40}
              className="rounded-circle"
              alt="user Image"
            />
            <div className="d-flex flex-column">
              <Typography variant="h6" className="text-md m-0 fw-semibold">
                {user?.f_name} {user?.l_name}
              </Typography>
              <div className="d-flex align-items-center ">
                <Typography
                  variant="p"
                  className="text-md  m-0 text-secondary fw-semibold"
                >
                  {moment(createdAt).format("lll")}
                </Typography>
                <LuDot />
                {visibility == "public" && (
                  <FaGlobeAsia size={12} className="text-secondary" />
                )}
                {visibility == "friends" && (
                  <FaUserFriends size={12} className="text-secondary" />
                )}
                {visibility == "friends_except" && (
                  <ImUsers size={12} className="text-secondary" />
                )}
                {visibility == "only me" && (
                  <FaLock size={12} className="text-secondary" />
                )}
                {visibility == " specific friends" && (
                  <PiUsersThreeFill size={12} />
                )}
              </div>
            </div>
          </div>
          <PostPopover />
        </div>
        <div className="caption pb-3 pt-1 px-3">
          <Typography className="">{caption}</Typography>
        </div>
        <div className="post-image">
          <img
            src={content}
            width={"100%"}
            className="object-cover"
            height={400}
            alt="post pic"
          />
        </div>
        <div className="d-flex p-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              className="p-1 rounded-full d-flex justify-content-center align-items-center "
              style={{ background: "#0A75FE", zIndex: "3" }}
            >
              <FaThumbsUp color="white" />
            </div>
            <div
              className="p-1 rounded-full d-flex justify-content-center align-items-center  "
              style={{ background: "#F92D3D", marginLeft: "-0.3rem" }}
            >
              <GoHeartFill color="white" />
            </div>
            <Typography className="fw-semibold ms-1 text-md text-secondary">
              30
            </Typography>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <Typography className="text-secondary">
              {" "}
              {comments?.length}comments
            </Typography>
            <Typography className="text-secondary">19 share </Typography>
          </div>
        </div>
        <div className="px-4">
          <hr className="m-0" />
        </div>

        <div className="d-flex pt-3 justify-content-between ">
          <div className="d-flex w-100  cursor-pointer justify-content-center gap-1 align-items-center ">
            <FiThumbsUp size={20} />
            <Typography className="text-md    text-secondary">Like</Typography>
          </div>
          <ModalPopup
            showInput={showInput}
            setShowInput={setShowInput}
            comments={comments?.length}
          />
          <div className="d-flex w-100 cursor-pointer justify-content-center gap-1 align-items-center">
            <BiLogoWhatsapp size={25} />
            <Typography className="text-md  text-secondary">Send</Typography>
          </div>
          <div className="d-flex w-100 cursor-pointer  justify-content-center gap-1 align-items-center">
            <PiShareFatLight size={20} />
            <Typography className="text-md  text-secondary">Share</Typography>
          </div>
        </div>
        <div
          className="px-3 py-2"
          style={{
            display: `${showInput ? "block" : "none"}`,
            visibility: `${showInput ? "visible" : "hidden"}`,
            opacity: `${showInput ? "1" : "0"}`,
            transition: "all 0.3s",
            zIndex: "0",
          }}
        >
          <hr className="m-1" />

          {comments?.map((item, index) => {
            return (
              <>
                <div className="d-flex my-2 align-items-center" key={index}>
                  <img
                    src={user?.image ? user?.image : "/icons/user.png"}
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div className="bg-light px-2 py-1">
                    <h6 className="m-0">
                      {user?.f_name} {user?.l_name}
                    </h6>
                    <p className="text-secondary">{item.comment}</p>
                  </div>
                </div>
              </>
            );
          })}
          <div className="d-flex align-items-center gap-1 ">
            <img
              src={user?.image ? user?.image : " /icons/user.png"}
              width={30}
              height={30}
              className="rounded-circle"
              alt="user-image"
            />
            <div
              style={{ background: "gray" }}
              className="d-flex form-control rounded-pill"
            >
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="w-100 outline-0 bg-transparent border-0 text-dark"
                placeholder="write a Comment..."
              />
              <IconButton>
                <IoSend onClick={addComment} size={15} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPost;
