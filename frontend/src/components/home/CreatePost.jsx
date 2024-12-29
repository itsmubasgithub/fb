import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";

const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="card p-3 border-0  bg-white shadow my-2  rounded-2">
        <div className="d-flex gap-2">
          <img
            src={user?.image ? user?.image : "/icons/user.png"}
            width={40}
            height={40}
            className="rounded-full"
            alt="user picture"
          />
          <CreatePostModal />
        </div>
      </div>
    </>
  );
};

export default CreatePost;
