import { Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addFriendRequest,
  requestReset,
} from "../../../features/requests/requestSlice";
import { Vortex } from "react-loader-spinner";
import io from "socket.io-client";
import Chat from "../../../pages/home/chats/Chat";
import { getPostData } from "../../../features/posts/postSlice";

const socket = io.connect("http://localhost:3001");

const UserList = ({
  f_name,
  l_name,
  image,
  _id,
  activePopupId,
  setActivePopupId,
  sentMessages,
  setSentMessages,
  recievedMessages,
  setRecievedMessages,
}) => {
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();
  const [btnState, setBtnState] = useState({
    text: "Add Friend",
    disabled: false,
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { requestLoading, requestError, requestMessage } = useSelector(
    (state) => state.requests
  );

  const username = f_name + " " + l_name;
  const sliceName =
    username.length > 10 ? `${username.slice(0, 10)}...` : username;

  // useEffect(() => {
  //   if (requestError) {
  //     toast.error(requestMessage);
  //   }
  //   dispatch(requestReset());
  // }, [requestError]);

  const handleRequest = async (id) => {
    try {
      setLoading(true);
      socket.emit("add_friend", { from_id: user?._id, to_id: id });

      await dispatch(addFriendRequest(id));
      setBtnState({ text: "Requested", disabled: true });
    } catch (error) {
      toast.error("Already Requested!");
    } finally {
      setLoading(false);
    }
  };

  const [showMessenger, setShowMessenger] = useState(false);
  const [message, setMessage] = useState("");

  const isPopUpOpen = activePopupId == _id;

  const [userID, setUserID] = useState(null);

  const sendMessage = () => {
    socket.emit("sent_message", {
      message,
      from_id: user?._id,
      to_id: _id,
      sent: true,
      time: Date.now(),
    });

    setSentMessages([
      ...sentMessages,
      {
        message,
        from_id: user?._id,
        to_id: _id,
        sent: true,
        time: Date.now(),
      },
    ]);
  };

  useEffect(() => {
    socket.on("recieved_message", (data) => {
      setRecievedMessages([
        ...recievedMessages,
        {
          message: data.message,
          sent: false,
          from_id: data.from_id,
          to_id: data.to_id,
          time: data.time,
        },
      ]);
    });
  });

  const allMessages = [...recievedMessages, ...sentMessages].sort((a, b) => {
    return a.time - b.time;
  });

  return (
    <>
      {isPopUpOpen && (
        <Chat
          allMessages={allMessages}
          sendMessage={sendMessage}
          userID={userID}
          message={message}
          setMessage={setMessage}
          closePopup={() => setActivePopupId(null)}
        />
      )}
      <div className="d-flex rounded-3 gap-3 new-requests p-2 align-items-center">
        <div className="user-image">
          <img
            width={65}
            height={65}
            className="rounded-circle"
            src={image ? image : "/icons/user.png"}
            alt="user"
          />
        </div>
        <div className="user-request">
          <div className="d-flex justify-content-between text-capitalize fw-semibold">
            <Typography variant="p" className="text-md fw-semibold">
              {sliceName}
            </Typography>
          </div>
          <div className="d-flex gap-2">
            <Button
              ref={btnRef}
              size="small"
              sx={{ textTransform: "capitalize", width: "max-content" }}
              onClick={() => handleRequest(_id)}
              className="fw-semibold"
              variant="contained"
              // disabled={requestLoading}
            >
              {loading ? (
                <Vortex
                  visible={true}
                  height="30"
                  width="30"
                  disabled={btnState.disabled || requestLoading}
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  style={{
                    background: btnState.disabled ? "#D6D9DD" : "blue",
                    fontWeight: "500",
                  }}
                  wrapperClass="vortex-wrapper"
                  colors={["gray", "white", "white"]}
                />
              ) : (
                <>{btnState?.text}</>
              )}
            </Button>
            <Button
              sx={{
                textTransform: "capitalize",
                width: "max-content",
              }}
              size="small"
              variant="contained"
              style={{
                background: "gray",
                color: "black",
                fontWeight: "500",
              }}
              onClick={() => {
                setActivePopupId(isPopUpOpen ? null : _id); // Toggle the popup ID
                setUserID(_id); // Log the ID for debugging
              }}
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
