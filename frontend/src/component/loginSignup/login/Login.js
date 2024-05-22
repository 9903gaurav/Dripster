import "./Login.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loadingLogin, setLoadingLogin] = useState(0);
  const [loadingOtp, setLoadingOtp] = useState(0);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(0);
  const [loadingChangePassword, setLoadingChangePassword] = useState(0);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      if (currentStep < 3) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState("");
  const [forgotPasswordNewPassword, setForgotPasswordNewPassword] =
    useState("");
  const [forgotPasswordReNewPassword, setForgotPasswordReNewPassword] =
    useState("");

  const [forgotPasswordEmailError, setForgotPasswordEmailError] =
    useState(false);
  const [forgotPasswordOtpError, setForgotPasswordOtpError] = useState(false);
  const [forgotPasswordNewPasswordError, setForgotPasswordNewPasswordError] =
    useState(false);

  const onChangeEmail = (event) => {
    setLoginEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    setLoadingLogin(1);
    if (loginEmail !== "") {
      if (props.emailRegex.test(loginEmail)) {
        if (loginPassword !== "") {
          if (props.passwordRegex.test(loginPassword)) {
            validateLogin(loginEmail, loginPassword);
          } else {
            setLoadingLogin(0);
            props.forAlert({
              type: "warning",
              message: "Please Enter Valid Password",
            });
            return false;
          }
        } else {
          setLoadingLogin(0);
          props.forAlert({ type: "warning", message: "Please Enter Password" });
          return false;
        }
      } else {
        setLoadingLogin(0);
        props.forAlert({
          type: "warning",
          message: "Please Enter Valid Email",
        });
        return false;
      }
    } else {
      setLoadingLogin(0);
      props.forAlert({ type: "warning", message: "Please Enter Email" });
      return false;
    }
  };

  const validateLogin = (loginEmail, loginPassword) => {
    props.axiosInstance
      .post("/api/user/login", {
        loginEmail: loginEmail,
        loginPassword: loginPassword,
      })
      .then((response) => {
        if (response.data.success) {
          setLoadingLogin(0);
          props.loginStatus(true);
          props.forAlert({ type: "success", message: response.data.message });
          navigate("/");
          return true;
        } else {
          setLoadingLogin(0);
          props.forAlert({ type: "warning", message: response.data.message });
          return false;
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLoadingLogin(0);
          props.forAlert({ type: "danger", message: "Connection Timeout" });
          return false;
        } else {
          setLoadingLogin(0);
          props.forAlert({ type: "danger", message: error.message });
          return false;
        }
      });
  };

  const forgotPassowrdOpen = () => {
    setShowForgotPasswordModal(true);
  };

  const forgotPassowrdClose = () => {
    setShowForgotPasswordModal(false);
  };

  const onChangeForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };
  const onChangeForgotPasswordOtp = (e) => {
    setForgotPasswordOtp(e.target.value);
  };
  const onChangeForgotPasswordNewPassword = (e) => {
    setForgotPasswordNewPassword(e.target.value);
  };
  const onChangeForgotPasswordReNewPassword = (e) => {
    setForgotPasswordReNewPassword(e.target.value);
  };

  const sendOTP = (e) => {
    setLoadingOtp(1);
    e.preventDefault();
    if (forgotPasswordEmail !== "") {
      if (props.emailRegex.test(forgotPasswordEmail)) {
        props.axiosInstance
          .post("/user/sendOtp", {
            accEmail: forgotPasswordEmail,
          })
          .then((response) => {
            if (response.data.success) {
              setLoadingOtp(0);
              nextStep();
              return true;
            } else {
              setLoadingOtp(0);
              setForgotPasswordEmailError(response.data.message);
              return false;
            }
          })
          .catch((error) => {
            if (error.code === "ECONNABORTED") {
              setLoadingOtp(0);
              setForgotPasswordEmailError("Connection Timeout");
              return false;
            } else {
              setLoadingOtp(0);
              setForgotPasswordEmailError(error.message);
              return false;
            }
          });
      } else {
        setLoadingOtp(0);
        setForgotPasswordEmailError("Please Enter Valid Email");
        return false;
      }
    } else {
      setLoadingOtp(0);
      setForgotPasswordEmailError("Please Enter Email");
      return false;
    }
  };

  const verifyOTP = (e) => {
    setLoadingVerifyOtp(1);
    e.preventDefault();
    if (forgotPasswordOtp !== 0) {
      props.axiosInstance
        .post("/user/verifyOtp", {
          accEmail: forgotPasswordEmail,
          otp: forgotPasswordOtp,
        })
        .then((response) => {
          if (response.data.success) {
            setLoadingVerifyOtp(0);
            nextStep();
            return true;
          } else {
            setLoadingVerifyOtp(0);
            setForgotPasswordOtpError(response.data.message);
            return false;
          }
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            setLoadingVerifyOtp(0);
            setForgotPasswordOtpError("Connection Timeout");
            return false;
          } else {
            setLoadingVerifyOtp(0);
            setForgotPasswordOtpError(error.data.message);
            return false;
          }
        });
    } else {
      setLoadingVerifyOtp(0);
      setForgotPasswordOtpError("Please Enter OTP");
      return false;
    }
  };

  const changePassword = (e) => {
    setLoadingChangePassword(1);
    e.preventDefault();
    if (forgotPasswordNewPassword !== "") {
      if (props.emailRegex.test(forgotPasswordNewPassword)) {
        if (forgotPasswordReNewPassword === forgotPasswordNewPassword) {
          props.axiosInstance
            .post("/user/forgotPassword", {
              accEmail: forgotPasswordEmail,
              newPass: forgotPasswordNewPassword,
              reNewPass: forgotPasswordReNewPassword,
            })
            .then((response) => {
              if (response.data.success) {
                setLoadingChangePassword(0);
                alert("Password Changed");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
                return true;
              } else {
                setLoadingChangePassword(0);
                setForgotPasswordEmailError(response.data.message);
                return false;
              }
            })
            .catch((error) => {
              if (error.code === "ECONNABORTED") {
                setLoadingChangePassword(0);
                setForgotPasswordEmailError("Connection Timeout");
                return false;
              } else {
                setLoadingChangePassword(0);
                setForgotPasswordEmailError(error.message);
                return false;
              }
            });
        } else {
          setLoadingChangePassword(0);
          setForgotPasswordNewPasswordError("Both Password are not Matching");
          return false;
        }
      } else {
        setLoadingChangePassword(0);
        setForgotPasswordNewPasswordError("Please Enter Valid Password");
        return false;
      }
    } else {
      setLoadingChangePassword(0);
      setForgotPasswordNewPasswordError("Please Enter Password");
      return false;
    }
  };

  return (
    <>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 row">
            <div className="col-12">
              <h4 className="text-light bg-dark p-3 rounded-2 mt-3 ">Login</h4>
            </div>
            <form
              onSubmit={loginSubmit}
              method="POST"
              key="loginForm"
              className="needs-validation mt-2"
              noValidate
            >
              <div className="col-12">
                <label htmlFor="loginEmail" className="form-label text-light">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent text-light rounded-2"
                  key="loginEmail"
                  id="loginEmail"
                  required
                  value={loginEmail}
                  onChange={onChangeEmail}
                />
              </div>
              <div className="col-12 mt-3">
                <label
                  htmlFor="loginPassword"
                  className="form-label text-light"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent text-light rounded-2"
                  key="loginPassword"
                  id="loginPassword"
                  required
                  value={loginPassword}
                  onChange={onChangePassword}
                />
                <div
                  className="form-text text-light btn border-0 p-0 d-flex justify-content-end"
                  id="forgotPassword"
                  onClick={forgotPassowrdOpen}
                >
                  Forgot Password
                </div>
              </div>
              <div className="col-12 mt-4">
                <p className="text-light blockquote-footer">
                  I agree to the Dripster Clothing Terms & Conditions by
                  clicking 'Login'
                </p>
              </div>
              <div className="col-12 mt-2">
                {(loadingLogin && (
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
                    Login
                  </button>
                )}
              </div>
              <div className="col-12 mt-3">
                <NavLink to={"/signup"} className="btn btn-outline-light w-100">
                  Become a Member
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`modal border-0 ${showForgotPasswordModal && "d-block"}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog border-0">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title text-light">Forgot Password</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={forgotPassowrdClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  {currentStep === 1 && (
                    <form
                      onSubmit={sendOTP}
                      method="POST"
                      key="forgotPasswordEmailForm"
                      className="needs-validation mt-2"
                      noValidate
                    >
                      {forgotPasswordEmailError && (
                        <div className="col-12 mb-2 text-danger">
                          {forgotPasswordEmailError}
                        </div>
                      )}
                      <div className="col-12">
                        <label
                          htmlFor="forgotPasswordEmail"
                          className="form-label text-light"
                        >
                          Email Associated with Your Account
                        </label>
                        <input
                          type="email"
                          className="form-control bg-transparent text-light rounded-2"
                          key="forgotPasswordEmail"
                          id="forgotPasswordEmail"
                          required
                          value={forgotPasswordEmail}
                          onChange={onChangeForgotPasswordEmail}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        {(loadingOtp && (
                          <button
                            type="button"
                            className="btn btn-dark w-100"
                            disabled
                          >
                            <div
                              className="spinner-border bg-transparent"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </button>
                        )) || (
                          <button type="submit" className="btn btn-dark w-100">
                            Send OTP
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                  {currentStep === 2 && (
                    <form
                      onSubmit={verifyOTP}
                      method="POST"
                      key="forgotPasswordOtpForm"
                      className="needs-validation mt-2"
                      noValidate
                    >
                      {forgotPasswordOtpError && (
                        <div className="col-12 mb-2 text-danger">
                          {forgotPasswordOtpError}
                        </div>
                      )}
                      <div className="col-12">
                        <label
                          htmlFor="forgotPasswordOtp"
                          className="form-label text-light"
                        >
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          className="form-control bg-transparent text-light rounded-2"
                          key="forgotPasswordOtp"
                          id="forgotPasswordOtp"
                          required
                          value={forgotPasswordOtp}
                          onChange={onChangeForgotPasswordOtp}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-dark w-100">
                          Verify OTP
                        </button>
                      </div>
                      <div className="col-12 mt-3">
                        {(loadingVerifyOtp && (
                          <button
                            type="button"
                            className="btn btn-dark w-100"
                            disabled
                          >
                            <div
                              className="spinner-border bg-transparent"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </button>
                        )) || (
                          <button
                            className="btn btn-outline-light w-100"
                            onClick={prevStep}
                          >
                            Go Back
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                  {currentStep === 3 && (
                    <form
                      onSubmit={changePassword}
                      method="POST"
                      key="forgotPasswordOtpForm"
                      className="needs-validation mt-2"
                      noValidate
                    >
                      {forgotPasswordNewPasswordError && (
                        <div className="col-12 mb-2 text-danger">
                          {forgotPasswordNewPasswordError}
                        </div>
                      )}
                      <div className="col-12">
                        <label
                          htmlFor="forgotPasswordNewPassword"
                          className="form-label text-light"
                        >
                          Enter New Password
                        </label>
                        <input
                          type="password"
                          className="form-control bg-transparent text-light rounded-2"
                          key="forgotPasswordNewPassword"
                          id="forgotPasswordNewPassword"
                          required
                          value={forgotPasswordNewPassword}
                          onChange={onChangeForgotPasswordNewPassword}
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="forgotPasswordReNewPassword"
                          className="form-label text-light"
                        >
                          Re-Enter New Password
                        </label>
                        <input
                          type="password"
                          className="form-control bg-transparent text-light rounded-2"
                          key="forgotPasswordReNewPassword"
                          id="forgotPasswordReNewPassword"
                          required
                          value={forgotPasswordReNewPassword}
                          onChange={onChangeForgotPasswordReNewPassword}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        {(loadingChangePassword && (
                          <button
                            type="button"
                            className="btn btn-dark w-100"
                            disabled
                          >
                            <div
                              className="spinner-border bg-transparent"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </button>
                        )) || (
                          <button type="submit" className="btn btn-dark w-100">
                            Change Password
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
