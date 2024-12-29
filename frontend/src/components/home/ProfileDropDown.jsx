import React, { useState } from "react";
import { FaUser } from "react-icons/fa"; // Ensure you have imported FaUser
// Add import for `user` if it's from props or context
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BsGear, BsGearFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { RiFeedbackFill } from "react-icons/ri";
import { FaDoorOpen } from "react-icons/fa6";
import { logoutUser } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = ({ showPro }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => showPro(false)}
        className="underlay position-fixed top-0 start-0"
        style={{
          background: "",
          height: "100vh",
          width: "100vw",
          zIndex: "2",
        }}
      ></div>
      <div
        className="card border-0 position-absolute p-3 shadow"
        style={{ left: "-290px", width: "320px", zIndex: "3" }}
      >
        <div className="card shadow p-3 border-0 rounded-2">
          <div className="d-flex gap-2 align-items-center">
            {user?.image ? (
              <>
                <img
                  src={user.image}
                  width={40} // Increased to match placeholder size
                  height={40} // Ensure consistent height and width
                  className="rounded-circle" // Changed to `rounded-circle` for better compatibility with Bootstrap
                  alt="profile"
                />
                <Typography variant="p" className="text-sm fw-bold">
                  {user?.f_name} {user?.l_name}
                </Typography>
              </>
            ) : (
              <>
                <FaUser size={20} />
                <Typography variant="p" className="text-sm fw-bold">
                  {user?.f_name} {user?.l_name}
                </Typography>
              </>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
          <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <BsGearFill size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Setting & Privacy
            </Typography>
          </div>
          <MdKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
          <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <IoIosHelpCircle size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Help & Supports
            </Typography>
          </div>
          <MdKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
          <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <FaMoon size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Display and accessbility
            </Typography>
          </div>
          <MdKeyboardArrowRight size={25} />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
          <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <RiFeedbackFill size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Give Feedback
            </Typography>
          </div>
          <MdKeyboardArrowRight size={25} />
        </div>
        <div
          onClick={() => {
            dispatch(logoutUser());
            navigate("/");
          }}
          className="d-flex cursor-pointer justify-content-between align-items-center mt-4 mb-2"
        >
          <div className="d-flex gap-1 align-items-center">
            <div className="p-2 bg-gray rounded-circle">
              <FaDoorOpen size={25} />
            </div>
            <Typography variant="p" className="fw-semibold">
              Logout
            </Typography>
          </div>
          <MdKeyboardArrowRight size={25} />
        </div>
      </div>
    </>
  );
};

export default ProfileDropDown;
