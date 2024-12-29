import React from "react";
import { ImPhoneHangUp } from "react-icons/im";
import { IoCall } from "react-icons/io5";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const VideoCalled = ({ sender_id, reciever_id, url, setCall }) => {
  const rejectCall = () => {
    socket.emit("reject-call", {
      rejecter_id: reciever_id,
      rejected_id: sender_id,
    });
    setCall(false);
  };

  const answerCall = () => {
    window.open(url, "_blank");
  };
  return (
    <>
      <div
        style={{
          top: "30px",
          transform: "translateX(-50%)",
          zIndex: "9999",
        }}
        className="d-flex p-2 justify-content-between align-items-center rounded-pill shadow-lg col-lg-3 start-50  position-fixed bg-dark"
      >
        <div className="">
          <h6 className="text-white m-1">Username</h6>
          <p className="text-secondary m-1">mail</p>
        </div>
        <div className="d-flex gap-2">
          <div
            onClick={rejectCall}
            className="p-2 d-flex justify-content-center cursor-pointer align-items-center bg-danger text-white"
            style={{ clipPath: "circle()" }}
          >
            <ImPhoneHangUp size={20} color="white" />
          </div>
          <div
            onClick={answerCall}
            className="p-2 justify-content-center cursor-pointer align-items-center bg-success text-white"
            style={{ clipPath: "circle()" }}
          >
            <IoCall size={20} color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCalled;
