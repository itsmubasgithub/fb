import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { BsPersonExclamation } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";

const PrivacyBox = ({
  showPrivacyBox,
  setShowPrivacyBox,
  visibility,
  setVisibility,
}) => {
  return (
    <>
      <div
        style={{
          transform: `${showPrivacyBox ? "translateX(0)" : "translateX(100%)"}`,
          opacity: `${showPrivacyBox ? "1" : "0"}`,
        }}
        className="position-absolute cursor-pointer transition-sm h-100  p-4 w-100 card border-0 top-0 shadow-lg end-0"
      >
        <div className="d-flex align-items-center">
          <div
            onClick={() => setShowPrivacyBox(false)}
            className="p-2  d-flex justify-content-center align-items-center rounded-full bg-gray position-absolute"
          >
            <IoArrowBackSharp size={22} />
          </div>
          <h5 className="text-center w-100 fw-bold text-md">Post Audience</h5>
        </div>
        <hr />
        <h6 className="fw-semibold">Who can see your post</h6>
        <p className="text-secondary text-sm text-md m-0 p-0 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        </p>

        <div className="d-flex my-2  justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 d-flex justify-content-center align-items-center rounded-full bg-gray">
              <FaGlobeAmericas size={28} />
            </div>
            <div className="">
              <h6 className="fw-bold text-md">Publics</h6>
              <p className="text-secondary text-sm p-0 m-0">
                AnyOne is in a Public
              </p>
            </div>
          </div>
          <input
            onChange={(e) => setVisibility(e.target.value)}
            type="radio"
            value="public"
            className="form-check type-radio"
            name="type"
          />
        </div>
        <div className="d-flex  my-2  justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2  d-flex justify-content-center align-items-center rounded-full bg-gray">
              <FaUserFriends size={28} />
            </div>
            <div className="">
              <h6 className="fw-bold text-md ">Friends</h6>
              <p className="text-secondary text-sm p-0 m-0">
                AnyOne is in a Friends
              </p>
            </div>
          </div>
          <input
            type="radio"
            value="friends"
            className="form-check type-radio"
            name="type"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div className="d-flex  my-2  justify-content-between text-center align-items-center">
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <div className="p-2 d-flex justify-content-center align-items-center rounded-full bg-gray">
              <BsPersonExclamation size={28} />
            </div>
            <div className=" d-flex justify-content-center align-items-center flex-column">
              <h6 className="fw-bold  text-md">Friends except..</h6>
              <p className="text-secondary text-sm p-0 m-0">
                AnyOne is in a Except
              </p>
            </div>
          </div>
          <input
            type="radio"
            value="friends_except"
            className="form-check type-radio"
            name="type"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div className="d-flex  my-2  justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2  d-flex justify-content-center align-items-center rounded-full bg-gray">
              <FaGlobeAmericas size={28} />
            </div>
            <div className="">
              <h6 className="fw-bold text-md  ">Specific Friends</h6>
              <p className="text-secondary text-sm p-0 m-0 ">
                AnyOne is in a Specific
              </p>
            </div>
          </div>
          <input
            type="radio"
            value="specific friends"
            className="form-check type-radio"
            name="type"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div className="d-flex my-2  justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="p-2 d-flex justify-content-center align-items-center rounded-full bg-gray">
              <FaLock size={28} />
            </div>
            <div className="">
              <h6 className="fw-bold text-md ">Only me</h6>
              <p className="text-secondary text-sm p-0 m-0 ">
                AnyOne is is Only
              </p>
            </div>
          </div>
          <input
            type="radio"
            value="only me"
            className="form-check type-radio"
            name="type"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default PrivacyBox;
