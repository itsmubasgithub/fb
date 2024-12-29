import React, { useState } from "react";

import { Typography } from "@mui/material";
import { sideBar } from "../../data/data";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
const SideBar = () => {
  const { user } = useSelector((state) => state.user);
  const username = user?.f_name + "" + user?.l_name;
  const [number, setNumber] = useState(8);
  return (
    <>
      <div
        className="height-100  bg-light side-bar  position-sticky"
        style={{ top: "60px" }}
      >
        <ul className="list-unstyled gap-3 d-flex flex-column">
          <li className="d-flex sidebar-list  p-2 rounded-2 gap-2 align-items-center">
            <img
              width={30}
              src={`${user?.image ? user?.image : "/icons/user.png"}`}
              alt=""
            />
            <Typography variant="p" className="fw-semibold">
              {username?.length > 10
                ? username?.slice(0, 10) + "..."
                : user?.l_name}
            </Typography>
          </li>
          {sideBar?.slice(0, number)?.map((item, index) => {
            return (
              <li
                key={item?.id}
                className="d-flex sidebar-list  p-2 rounded-2 gap-2 align-items-center"
              >
                <div className="icon">
                  <img width={30} src={item?.image} alt="" />
                </div>
                <div className="text">
                  <Typography variant="p" className="fw-semibold">
                    {item?.title}
                  </Typography>
                </div>
              </li>
            );
          })}
        </ul>
        <span
          onClick={
            number == 8 ? () => setNumber(sideBar?.length) : () => setNumber(8)
          }
          className="p-3 box-see cursor-pointer d-block text-center rounded-full  bg-gray"
        >
          <div className="d-flex  justify-content-center  align-items-center">
            {number == 8 ? (
              <>
                <RiArrowDropDownLine size={25} className=" icon-see " />
                <Typography
                  variant="p"
                  className="text-sm-see button-see text-center "
                >
                  See more
                </Typography>
              </>
            ) : (
              <>
                <RiArrowDropUpLine size={25} className=" icon-see " />
                <Typography
                  variant="p"
                  className="text-sm-see button-see text-center "
                >
                  See less
                </Typography>
              </>
            )}
          </div>
        </span>
      </div>
    </>
  );
};

export default SideBar;
