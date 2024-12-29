import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./request.css";
import { Button, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { rejectRequestData } from "../../../features/requests/requestSlice";
import { Vortex } from "react-loader-spinner";
const ShowRequestPop = ({ from_id, to_id, newRequest, setNewRequest }) => {
  const { allUsers } = useSelector((state) => state.user);
  const findUser = allUsers?.find((item, index) => {
    return item?._id == from_id;
  });
  const { requestLoading } = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        left: "20px",
        bottom: "20px",
        transition: "all 0.7s",
        transform: `${newRequest ? "translateY(0)" : "translateY(120%)"}`,
        opacity: `${newRequest ? "1" : "0"}`,
        zIndex: "333",
      }}
      className="notification-popup position-fixed container d-flex justify-content-center align-items-center col-lg-4 col-md-5 col-sm-6"
    >
      <div className="popup bg-dark text-white p-4 rounded-4 shadow">
        <button
          className="   border-0 bg-dark rounded-5  position-absolute top-0 end-0 "
          style={{ marginRight: "16px" }}
        >
          <IconButton onClick={() => setNewRequest(false)}>
            <IoClose color="white" />
          </IconButton>
        </button>
        <div className="notification text-center">
          <h2 className="text-white fw-lighter mb-4">New Friend Request</h2>
          <div className="notification-icon d-flex align-items-center justify-content-start mb-4 gap-1">
            <img
              width={50}
              height={50}
              className="rounded-circle"
              src={findUser?.image ? findUser?.image : "/icons/user.png"}
              alt="user image"
            />
            <h5 className="ms-3 fs-5  m-0 text-capitalize">
              {findUser?.f_name} {findUser?.l_name}
            </h5>
          </div>
          <div className="button-container d-flex justify-content-end gap-3">
            <Button
              disabled={requestLoading}
              onClick={async () => {
                dispatch(
                  await rejectRequestData({
                    from: from_id,
                    to: to_id,
                  })
                );
                setNewRequest(false);
              }}
              variant="contained"
              className={`block-btn btn btn-outline-danger bg-danger fw-bold${
                requestLoading && "btn-disabled"
              }`}
            >
              {requestLoading ? (
                <>
                  <Vortex
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={["black"]}
                  />
                </>
              ) : (
                <>Reject</>
              )}
            </Button>
            <Button
              variant="contained"
              className="allow-btn btn btn-outline-success bg-success fw-bold"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRequestPop;
