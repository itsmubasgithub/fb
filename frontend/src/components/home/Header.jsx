import React, { useEffect, useState } from "react";
import { BiSearch, Bisearch } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProfileDropDown from "./ProfileDropDown";

const Header = () => {
  const [size, setSize] = useState(window.innerWidth);
  const { user } = useSelector((state) => state.user);
  const [showPro, setShowProf] = useState(false);

  const changeSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", changeSize);

    return () => {
      window.removeEventListener("resize", changeSize);
    };
  });

  return (
    <>
      <div
        className="d-flex p-1 bg-white shadow-sm position-sticky top-0 z-3 align-items-center justify-content-between"
        style={{ width: "100vw" }}
      >
        <div className="search d-flex gap-2">
          <img
            width={50}
            src="https://cdn-icons-png.flaticon.com/256/20/20673.png"
            alt="facebook"
          />

          <div className="d-flex bg-light align-items-center form-control rounded-pill">
            <BiSearch size={20} className="text-secondary" />
            {size >= 1250 && (
              <input
                type="search"
                name=""
                className="border-0 outline-0 bg-light "
                id=""
                placeholder="search facebook"
              />
            )}
          </div>
        </div>
        {size >= 700 && (
          <ul className="menu-items m-0 d-flex justify-content-between w-35 fs-3 gap-3 list-unstyled fw-bold text-secondary-emphasis">
            <li>
              <FiHome size={24} className="text-secondary-emphasis" />
            </li>
            <li>
              <BsPeople size={24} className="text-secondary-emphasis" />
            </li>
            <li>
              <MdOutlineOndemandVideo
                size={24}
                className="text-secondary-emphasis"
              />
            </li>
            <li>
              <BsShop size={24} className="text-secondary-emphasis" />
            </li>
            <li>
              <CgGames size={24} className="text-secondary-emphasis" />
            </li>
          </ul>
        )}

        <div className="right-icons d-flex gap-2">
          <div className="p-2 rounded-full" style={{ background: "#F0F0F0" }}>
            <TfiLayoutGrid4Alt size={20} />
          </div>
          <div className="position-relative">
            <div className="p-2 rounded-full" style={{ background: "#F0F0F0" }}>
              <FaFacebookMessenger size={20} />
            </div>
            <div
              className="notifications test-sm  end-0 position-absolute bg-danger rounded-full p-1 text-center text-white"
              style={{ top: "-10px" }}
            >
              1
            </div>
          </div>
          <div className="position-relative">
            <div className="p-2 rounded-full" style={{ background: "#F0F0F0" }}>
              <FaBell size={20} />
            </div>
            <div
              className="notifications  test-sm  end-0 position-absolute bg-danger rounded-full p-1 text-center text-white"
              style={{ top: "-10px" }}
            >
              9
            </div>
          </div>
          <div className=" position-relative" style={{ background: "#F0F0F0" }}>
            {user?.image ? (
              <img
                src={user.image}
                width={20}
                className="rounded-full"
                alt="apni image"
              />
            ) : (
              <div className="position-relative">
                <div
                  className="rounded-full p-2 bg-light d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40 }}
                >
                  <FaUser size={20} />
                </div>
                <div
                  onClick={() => setShowProf(true)}
                  className="drop position-absolute"
                  style={{ bottom: "-3px", right: "-2px" }}
                >
                  <RiArrowDropDownLine className="bg-dark text-white rounded-circle" />
                </div>
              </div>
            )}
            {showPro && <ProfileDropDown showPro={setShowProf} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
