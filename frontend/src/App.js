import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./globals.css";
import Login from "./pages/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/auth/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import OTP from "./pages/auth/OTP";
import "react-loading-skeleton/dist/skeleton.css";
import { RiH1 } from "react-icons/ri";
import MarketPlace from "./pages/home/MarketPlace";
import VideoCall from "./pages/video/VideoCall";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // if (loading) {
  //   return (
  //     <>
  //       <div
  //         style={{ height: "100vh" }}
  //         className="d-flex justify-content-center align-items-center"
  //       >
  //         <img
  //           width={150}
  //           height={150}
  //           src="https://lh5.googleusercontent.com/proxy/x8i5BH-sQT41kPGhxTlnqc7bZ4cOwmLLX5a3BB6wa_aaa41iqXNC3OPmhaOZG6RY-tYVEDFDeCKfglQ6OS6eFSzqEhGS"
  //           alt="Loading "
  //         />
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/video-call/:sender_id/:reciever_id" element={<VideoCall />} />

          <Route path="/otp" element={<OTP />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
