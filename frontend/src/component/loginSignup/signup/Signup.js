import "./Signup.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup(props) {
  const navigate = useNavigate();

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");

  const [loadingSignup, setLoadingSignup] = useState(0);

  const onChangeEmail = (event) => {
    setSignupEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setSignupPassword(event.target.value);
  };

  const onChangeFirstName = (event) => {
    setSignupFirstName(event.target.value);
  };

  const onChangeLastName = (event) => {
    setSignupLastName(event.target.value);
  };

  const signupSubmit = (e) => {
    setLoadingSignup(1);
    e.preventDefault();
    if (signupFirstName !== "") {
      if (signupLastName !== "") {
        if (signupEmail !== "") {
          if (props.emailRegex.test(signupEmail)) {
            if (signupPassword !== "") {
              if (props.passwordRegex.test(signupPassword)) {
                validateSignup(signupEmail, signupPassword);
              } else {
                setLoadingSignup(0);
                props.forAlert({
                  type: "warning",
                  message: "Please Enter Valid Password",
                });
                return false;
              }
            } else {
              setLoadingSignup(0);
              props.forAlert({
                type: "warning",
                message: "Please Enter Password",
              });
              return false;
            }
          } else {
            setLoadingSignup(0);
            props.forAlert({
              type: "warning",
              message: "Please Enter Valid Email",
            });
            return false;
          }
        } else {
          setLoadingSignup(0);
          props.forAlert({ type: "warning", message: "Please Enter Email" });
          return false;
        }
      } else {
        setLoadingSignup(0);
        props.forAlert({ type: "warning", message: "Please Enter Last Name" });
        return false;
      }
    } else {
      setLoadingSignup(0);
      props.forAlert({ type: "warning", message: "Please Enter First Name" });
      return false;
    }
  };

  const validateSignup = (signupEmail, signupPassword) => {
    props.axiosInstance
      .post("/api/user/signup", {
        signupEmail: signupEmail,
        signupPassword: signupPassword,
        signupFirstName: signupFirstName,
        signupLastName: signupLastName,
      })
      .then((response) => {
        if (response.data.success) {
          setLoadingSignup(0);
          props.forAlert({ type: "success", message: response.data.message });
          setTimeout(() => {
            navigate(response.data.navigate);
          }, 1000);
          return true;
        } else {
          setLoadingSignup(0);
          props.forAlert({ type: "warning", message: response.data.message });
          return false;
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLoadingSignup(0);
          props.forAlert({ type: "danger", message: "Connection Timeout" });
          return false;
        } else {
          setLoadingSignup(0);
          props.forAlert({ type: "danger", message: error.message });
          return false;
        }
      });
  };

  return (
    <>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 row ">
            <div className="col-12">
              <h4 className="text-light bg-dark p-3 rounded-2 mt-3 ">Signup</h4>
            </div>
            <form
              onSubmit={signupSubmit}
              method="POST"
              key="signupForm"
              className="needs-validation mt-2"
              noValidate
            >
              <div className="col-6 pe-2 d-inline-block">
                <label
                  htmlFor="signupFirstName"
                  className="form-label text-light"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent text-light rounded-2"
                  key="signupFirstName"
                  id="signupFirstName"
                  value={signupFirstName}
                  onChange={onChangeFirstName}
                />
              </div>
              <div className="col-6 ps-2 d-inline-block">
                <label
                  htmlFor="signupLastName"
                  className="form-label text-light"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control bg-transparent text-light rounded-2"
                  key="signupLastName"
                  id="signupLastName"
                  value={signupLastName}
                  onChange={onChangeLastName}
                />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="signupEmail" className="form-label text-light">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent text-light rounded-2"
                  key="signupEmail"
                  id="signupEmail"
                  value={signupEmail}
                  onChange={onChangeEmail}
                />
              </div>
              <div className="col-12 mt-3">
                <label
                  htmlFor="signupPassword"
                  className="form-label text-light"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent text-light rounded-2"
                  key="signupPassword"
                  id="signupPassword"
                  value={signupPassword}
                  onChange={onChangePassword}
                />
              </div>
              <div className="col-12 mt-4">
                <p className="text-light blockquote-footer">
                  I agree to the Dripster Clothing Terms & Conditions by
                  clicking 'Become a Member'
                </p>
              </div>
              <div className="col-12 mt-2">
                {(loadingSignup && (
                  <button type="button" className="btn btn-dark w-100" disabled>
                    <div
                      className="spinner-border bg-transparent"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </button>
                )) || (
                  <button type="submit" className="btn btn-dark w-100">
                    Become a Member
                  </button>
                )}
              </div>
              <div className="col-12 mt-3">
                <NavLink to={"/login"} className="btn btn-outline-light w-100">
                  Already a Member
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
