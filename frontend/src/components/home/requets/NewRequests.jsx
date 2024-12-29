import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllUsersData, userReset } from "../../../features/users/userSlice";
import {
  myRequestsData,
  requestReset,
} from "../../../features/requests/requestSlice";
import ShowRequestPop from "./ShowRequestPop";
import io from "socket.io-client";
import Chat from "../../../pages/home/chats/Chat";
import { getPostData } from "../../../features/posts/postSlice";

const socket = io.connect("http://localhost:3001");

const NewRequests = () => {
  const { user, userLoading, userMessage, userSuccess, userError, allUsers } =
    useSelector((state) => state.user);
  const [newRequest, setNewRequest] = useState(false);
  const [userData, setUserData] = useState(null);

  const { requests, requestSuccess } = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    dispatch(getAllUsersData());
    dispatch(myRequestsData());
    dispatch(requestReset());
    dispatch(userReset());
  }, []);
  useEffect(() => {
    dispatch(getPostData()); // Fetch posts
  }, [dispatch]);

  const filteredUsers = allUsers?.filter((user) => {
    if (!Array.isArray(requests)) {
      console.error("requests is not an array", requests);
      return true; // Default behavior if requests is invalid
    }

    return !requests.some((request) =>
      request?.sendRequests?.some(
        (sendRequest) => sendRequest?.to === user?._id
      )
    );
  });

  useEffect(() => {
    socket.on("show_request", (data) => {
      if (data?.to_id == user?._id) {
        setNewRequest(true);
        const audio = new Audio("/sounds/newRequest.wav");
        audio.play();
        setUserData(data);
      }
    });
  }, [socket]);

  const [activePopupId, setActivePopupId] = useState(null);

  // messages

  const [sentMessages, setSentMessages] = useState([]);
  const [recievedMessages, setRecievedMessages] = useState([]);

  return (
    <>
      {newRequest && (
        <ShowRequestPop
          setNewRequest={setNewRequest}
          newRequest={newRequest}
          {...userData}
        />
      )}
      <div className="d-flex align-items-center    p-2 px-1 justify-content-between">
        <Typography
          variant="h6"
          className="text-secondary text-md m-0 fw-semibold"
        >
          Friend requests
        </Typography>
        <Typography
          variant="p"
          className="text-primary text-md fw-semibold m-0"
        >
          See All
        </Typography>
      </div>
      <div className="d-flex rounded-3 gap-3 new-requests p-2  align-items-center">
        <div className="user-image">
          <img
            width={65}
            height={65}
            className="rounded-circle"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9JsqxOgGFNVVKBMVmeCoU-G1W-rWUcb057f6NERgAYHHaJ8BknDGWXNyScS6v969bq0&usqp=CAU"
            alt="user image"
          />
        </div>
        <div className="user-request">
          <div className="d-flex justify-content-between">
            <Typography className=" text-md">Username</Typography>
            <Typography className=" text-sm text-primary waqt">5m</Typography>
          </div>
          <div className="d-flex gap-2">
            <Button className="fw-semibold" variant="contained">
              CONFIRM
            </Button>
            <Button
              className="fw-semibold"
              variant="contained "
              style={{ background: "#D6D9DD" }}
            >
              DELETE
            </Button>
          </div>
        </div>
      </div>
      <hr />
      {filteredUsers?.length > 0 ? (
        <>
          {filteredUsers?.map((item, index) => {
            return (
              <UserList
                activePopupId={activePopupId}
                setActivePopupId={setActivePopupId}
                sentMessages={sentMessages}
                setSentMessages={setSentMessages}
                recievedMessages={recievedMessages}
                setRecievedMessages={setRecievedMessages}
                key={index}
                {...item}
              />
            );
          })}
        </>
      ) : (
        <>
          {/* {allUsers?.map((item, index) => {
            return <UserList key={index} {...item} />;
          })} */}
        </>
      )}
    </>
  );
};

export default NewRequests;
