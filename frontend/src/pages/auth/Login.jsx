import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import LoginForm from "../../components/authentication/LoginForm";
import "../../components/authentication/utils/auth.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // get the user state from the global/state
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  });

  useEffect(()=>{
    document.title = "Login with Facebook"
  })
  return (
    <>
      <Container className=" col-lg-7 d-flex justify-content-center align-items-center height-90">
        <Row className="w-100">
          <Col lg={6} className="text-center">
            <img width={200} src={logo} alt="Logo" />
            <h3 className="fw-normal display-4">Recent Logins</h3>
            <p className="text-secondary fs-4">
              Click your Picture and Add or Account
            </p>
          </Col>

          <Col lg={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
