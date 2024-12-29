import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import SideBar from "../../components/home/SideBar";
import { Row, Col } from "react-bootstrap";
import { getPostData } from "../../features/posts/postSlice";
import Posts from "../../components/home/Posts";
import User from "../../components/home/User";
import ShowRequestPop from "../../components/home/requets/ShowRequestPop";
import Chat from "./chats/Chat";
import io from "socket.io-client";
import VideoCalled from "../videocall/VideoCalled";
import { userReset } from "../../features/users/userSlice";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [call, setCall] = useState(false);
  const { user, userSuccess } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(userReset());
  }, [user, userSuccess]);

  useEffect(() => {
    socket.on("show-video-data", (data) => {
      console.log(data);
      setCall(true);
      setUserData(data);
    });
  });

  useEffect(() => {
    socket.on("call-rejected", (data) => {
      if (data.rejected_id == user?._id) {
        alert("alert");
      }
    });
  });

  useEffect(() => {
    document.title = `Welcome ${user?.f_name} `;
  });

  return (
    <>
      {call && <VideoCalled {...userData} setCall={setCall} />}
      <Header />

      <Row>
        <Col xl={2} lg={2} md={0} className="d-none d-lg-block">
          <SideBar />
        </Col>
        <Col xl={7} lg={7} md={9} className="p-md-5 p-sm-2 p-xl-4 p-4">
          <Posts />
        </Col>
        <Col xl={3} lg={3} md={3}>
          <User />
        </Col>
      </Row>
    </>
  );
};

export default Home;
