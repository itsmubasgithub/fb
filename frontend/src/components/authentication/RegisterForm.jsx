import { Button, Card, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUserData, userReset } from "../../features/users/userSlice";
import toast from "react-hot-toast";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the data from the global store
  const { userError, userMessage, userLoading, userSuccess } = useSelector(
    (state) => state.user
  );

  // use error on error change

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    if (userSuccess) {
      navigate("/otp");
      toast.success("OTP has been sent to the email, Please verify!")
    }
    dispatch(userReset());
  }, [userError, userSuccess, dispatch]);
  const [months] = useState([
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "june",
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ]);
  const [formField, setFormField] = useState({
    f_name: "",
    l_name: "",
    gender: "",
    date: new Date().getDate(),
    month: months[new Date().getMonth()],
    years: new Date().getFullYear(),
    m_mail: "",
    password: "",
  });

  // destructure the properly

  const { f_name, l_name, gender, date, month, year, m_mail, password } =
    formField;

  const [years, setYears] = useState([]);

  const getCurrentYear = new Date().getFullYear();
  const startYear = 1905;

  //   fills the years array with the years
  useEffect(() => {
    const temp = [];
    for (let i = getCurrentYear; i >= startYear; i--) {
      temp.push(i);
    }

    setYears(temp);
  }, []);

  const handleChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      f_name,
      l_name,
      password,
      gender,
      m_mail,
      dob: `${date}-${month}-${year}`,
    };

    dispatch(registerUserData(userData));
  };

  return (
    <>
      <Card className="shadow rounded-3  p-3 col-lg-4 mx-auto">
        <Form>
          <h3 className="text-center fw-bold">Create a new account </h3>
          <p className="text-secondary text-center">Its quick and Easy</p>
          <hr />
          <div className="d-flex gap-2">
            <Form.Control
              value={f_name}
              onChange={handleChange}
              type="text"
              placeholder="First name"
              name="f_name"
            />
            <Form.Control
              value={l_name}
              onChange={handleChange}
              type="text"
              placeholder="Surname"
              name="l_name"
            />
          </div>
          <Form.Label className="text-secondary fw-medium">
            Date of birth{" "}
            <span className="text-secondary fw-bold bg-dark text-white question p-1">
              ?
            </span>
          </Form.Label>
          <div className="d-flex gap-2">
            <Form.Select name="date" value={date} onChange={handleChange}>
              {Array.from({ length: 31 }).map((_, index) => {
                return (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select name="month" value={month} onChange={handleChange}>
              {months?.map((item, index) => {
                return (
                  <option className="text-capitalize" key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select name="year" value={year} onChange={handleChange}>
              {years.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <Form.Label className="text-secondary fw-medium">
            Gender{" "}
            <span className="text-secondary fw-bold bg-dark text-white question p-1">
              ?
            </span>
          </Form.Label>
          <div className="d-flex justify-content-between gap-2">
            <div className="border d-flex justify-content-between  p-2 rounded-3 w-100 ">
              <Form.Label className="text-md">Female</Form.Label>
              <input
                aria-selected="false"
                name="gender"
                value="male"
                type="radio"
                onChange={handleChange}
                className="form-check"
              />
            </div>
            <div className="border d-flex p-2 rounded-3 justify-content-between w-100 ">
              <Form.Label className="text-md">Male</Form.Label>
              <input
                name="gender"
                value="male"
                aria-selected="false"
                type="radio"
                onChange={handleChange}
                className="form-check"
              />
            </div>
          </div>
          <Form.Control
            type="text"
            placeholder="mobile number or email"
            className="my-2 p-2"
            name="m_mail"
            onChange={handleChange}
            value={m_mail}
          />

          <Form.Control
            type="password"
            placeholder="password"
            className="my-2 p-2"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </Form>
        <p className="text-secondary text-sm p-0 ">
          People who use our service may have uploaded your contact information
          to Facebook. Learn more.
        </p>
        <p className="text-secondary text-sm p-0 m-0">
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You may receive SMS notifications from us and can opt
          out at any time.
        </p>
        <Button
          disabled={userLoading}
          onClick={handleRegister}
          variant="contained"
          className={`fw-bold w-50 bg-sign  rounded-2 d-block mx-auto my-1 ${
            userLoading && "btn-ghaib"
          }`}
        >
          {userLoading ? (
            <Vortex
              visible={true}
              height="30"
              width="30"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["black"]}
            />
          ) : (
            "Sign Up"
          )}
        </Button>
        <Link
          to="/"
          className="text-primary text-decoration-none d-block text-center"
        >
          Already have an account?
        </Link>
      </Card>
    </>
  );
};

export default RegisterForm;
