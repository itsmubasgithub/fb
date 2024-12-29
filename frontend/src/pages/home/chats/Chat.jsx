import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoMdVideocam } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Chat = ({
  sendMessage,
  message,
  setMessage,
  closePopUp,
  userID,
  allMessages,
}) => {
  const { allUsers, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Find the user you're chatting with
  const myUser = allUsers?.find((item) => item?._id === userID);

  // Filter messages whenever dependencies change
  useEffect(() => {
    if (allMessages && userID && user?._id) {
      const myMessages = allMessages.filter(
        (item) =>
          (item?.to_id === user?._id && item?.from_id === userID) ||
          (item?.from_id === user?._id && item?.to_id === userID)
      );
      setFilteredMessages(myMessages);
    } else {
      setFilteredMessages([]);
    }

    console.log("Filtered messages updated:", filteredMessages);
  }, [allMessages, userID, user?._id]);

  const handleVideoCall = () => {
    window.open(
      `http://localhost:3000/video-call/${user?._id}/${userID}`,
      "_blank"
    );
  };

  return (
    <div
      className="card position-fixed bg-dark text-white z-3 border-0 shadow-lg"
      style={{
        width: "20rem",
        right: "150px",
        bottom: "10px",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div className="card-header bg-info d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-1">
          <img
            width={40}
            height={40}
            className="rounded-circle"
            src="https://cdn.pixabay.com/photo/2024/06/29/20/51/ai-generated-8862067_640.jpg"
            alt="User Avatar"
          />
          <span className="text-dark fw-bold">{myUser?.f_name}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <IoMdVideocam
            onClick={handleVideoCall}
            color="black"
            size={20}
            cursor={"pointer"}
          />
          <button
            onClick={closePopUp}
            type="button"
            className="btn-close fw-bold"
            aria-label="Close"
          ></button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {/* User Info */}
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center mb-3">
          <img
            width={60}
            height={60}
            src="https://cdn.pixabay.com/photo/2024/06/29/20/51/ai-generated-8862067_640.jpg"
            alt="Profile"
            className="rounded-circle me-2"
          />
          <div className="text-center">
            <h6 className="mb-0 ">
              {myUser?.f_name} {myUser?.l_name}
            </h6>
            <small>You are now connected on Messenger</small>
          </div>
        </div>

        {/* Date (Static Example) */}
        <small className="text-muted">21 Oct 2024, 20:06</small>

        {/* Messages */}
        <div
          className="d-flex flex-column gap-1 mt-3"
          style={{ overflow: "hidden" }}
        >
          {filteredMessages.map((item, index) => (
            <div
              key={index}
              className={`p-2 rounded-3 fw-semibold ${
                item?.sent
                  ? "bg-secondary text-dark ms-auto"
                  : "bg-primary text-white me-auto"
              }`}
              style={{ maxWidth: "115px" }}
            >
              {item?.message}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-info d-flex align-items-center">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="form-control me-2 rounded-pill"
          placeholder="Aa"
        />
        <div onClick={sendMessage} style={{ cursor: "pointer" }}>
          <IoSend size={20} color="black" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
