import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Middleware(props) {
const navigate = useNavigate();

useEffect(() => {
  props.axiosInstance
    .post("/api/user/verifyLogin")
    .then((response) => {
      const isLoggedIn = response.data.success;
      const isLoginPage = window.location.pathname === "/login";
      const isSignupPage = window.location.pathname === "/signup";

      if (isLoggedIn) {
        props.loginStatus(true);
        if (isLoginPage || isSignupPage) navigate("/");
      } else {
        props.loginStatus(false);
        if (isLoginPage || isSignupPage){
        } else {
          navigate("/");
          props.forAlert({ type: "warning", message: response.data.message });
        }
      }
    })
    .catch((error) => {
      props.loginStatus(false);
      alert(error);
      navigate("/");
    });
}, [props, navigate]);

  return <div></div>;
}
