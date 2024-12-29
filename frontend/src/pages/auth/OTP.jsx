import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { userReset, verifyOtpData } from "../../features/users/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const { user, userError, userSuccess, userMessage, userLoading } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.otp == null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    if (userSuccess) {
      toast.success("otp verified");
      navigate("/home");
    }

    dispatch(userReset());
  }, [userError, userSuccess, dispatch]);

  const verifyOTP = () => {
    const otpData = {
      user_id: user?._id,
      otp,
    };

    dispatch(verifyOtpData(otpData));
  };
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <Row className="justify-content-center w-100 px-3">
          <Col
            sm={12}
            md={10}
            lg={8}
            xl={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className="card card-otp shadow p-4 w-100"
              style={{
                width: "100%",
                maxWidth: "500px", // Limits on larger screens
                minWidth: "300px", // Ensures readability on smaller screens
              }}
            >
              <h4 className="display-6 text-info text-center fw-medium mb-4">
                Enter Verification Code
              </h4>
              <OtpInput
                inputType="tel"
                inputStyle={{
                  padding: "1rem",
                  width: "100%", // Full width for each input
                  maxWidth: "50px", // Limits input size
                  margin: "0 0.25rem",
                  border: "2px dotted skyblue",
                  borderRadius: "5px",
                }}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
              />
              <div className="d-flex justify-content-around flex-wrap mt-3">
                <Button
                  variant="contained"
                  className="bg-danger rounded-pill p-2 fw-bold w-100 mb-2"
                  style={{ maxWidth: "150px" }}
                >
                  Clear
                </Button>
                <Button
                  disabled={userLoading}
                  variant="contained"
                  onClick={verifyOTP}
                  className="rounded-pill fw-bold p-2 w-100"
                  style={{ maxWidth: "150px" }}
                >
                  {userLoading ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <ThreeCircles
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="vortex-loading"
                        wrapperClass="vortex-wrapper"
                        color="white"
                      />
                      Verify OTP
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OTP;
