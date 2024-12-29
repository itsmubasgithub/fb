import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { Button, tableFooterClasses } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUserData, userReset } from "../../features/users/userSlice";
import { toast } from "react-hot-toast";
import { Vortex } from "react-loader-spinner";

const LoginForm = () => {
  const [showEye, setShowEye] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { user, userLoading, userError, userSuccess, userMessage } =
    useSelector((state) => state.user);
  const [formFields, setFormFields] = useState({
    m_mail: "",
    password: "",
  });

  const { m_mail, password } = formFields;

  useEffect(() => {
    if (password.length > 0) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
  }, [password]);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    if (user) {
      navigate("/home");
    }
    dispatch(userReset());
  }, [userError, userSuccess, dispatch]);

  const handleLogin = () => {
    const userData = {
      m_mail,
      password,
    };

    dispatch(loginUserData(userData));
  };
  return (
    <>
      <Form className="shadow rounded-3 p-2">
        <Form.Control
          type="text"
          value={m_mail}
          onChange={handleChange}
          name="m_mail"
          className="p-3 my-2"
          placeholder="Email Address or Phone Number"
        />

        <div className="d-flex align-items-center border rounded-3 p-2  ">
          <Form.Control
            type={`${showPass ? "text" : "password"}`}
            value={password}
            name="password"
            onChange={handleChange}
            className=" border-0 "
            placeholder="Password"
          />
          {showEye && (
            <>
              {showPass ? (
                <PiEyeLight
                  size={20}
                  onClick={() => setShowPass(false)}
                  cursor={"pointer"}
                  className="me-2"
                />
              ) : (
                <PiEyeSlash
                  size={20}
                  onClick={() => setShowPass(true)}
                  cursor={"pointer"}
                  className="me-2"
                />
              )}
            </>
          )}
        </div>
        <Button
          onClick={handleLogin}
          disabled={userLoading}
          variant="contained"
          className={`p-2 my-2 w-100 ${userLoading && "bg-secondary"}`}
        >
          {userLoading ? (
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
            "LogIn"
          )}
        </Button>
        <hr />
        <a
          href=""
          className="text-primary text-decoration-none  d-block text-center "
        >
          Forgotten Password
        </a>

        <Link to="/register" className="text-white text-decoration-none">
          <Button
            variant="contained"
            className="d-block mx-auto text-capitalize my-2  bg-green"
          >
            Create new account
          </Button>
        </Link>
      </Form>
    </>
  );
};

export default LoginForm;
