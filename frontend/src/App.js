import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, Suspense, lazy } from "react";
import Loading from "./component/includes/loading/Loading";
import axios from "axios";

const Navbar = lazy(() =>
  delayForDemo(import("./component/includes/navbar/Navbar"))
);

const Paths = lazy(() =>
  delayForDemo(import("./component/includes/paths/Path"))
);

const Alerts = lazy(() =>
  delayForDemo(import("./component/includes/alert/Alert"))
);

const HomeBanner = lazy(() =>
  delayForDemo(import("./component/homePage/homeBanner/HomeBanner"))
);

const NewDrips = lazy(() =>
  delayForDemo(import("./component/homePage/newDrip/NewDrip"))
);

const Login = lazy(() =>
  delayForDemo(import("./component/loginSignup/login/Login"))
);

const Signup = lazy(() =>
  delayForDemo(import("./component/loginSignup/signup/Signup"))
);

const Middleware = lazy(() =>
  delayForDemo(import("./component/middleware/Middleware"))
);

const NavTabs = lazy(() =>
  delayForDemo(import("./component/userAccount/NavTab"))
);
const AccDetail = lazy(() =>
  delayForDemo(import("./component/userAccount/AccDetail"))
);
const ChangePassword = lazy(() =>
  delayForDemo(import("./component/userAccount/changePassword"))
);

const OverSizedTshirtTemplate = lazy(() =>
  delayForDemo(import("./component/product/OversizedTshirtTemplate"))
);

const Cart = lazy(() => delayForDemo(import("./component/usercart/UserCart")));

const Logout = lazy(() => delayForDemo(import("./component/logout/Logout")));

function App() {
  const [alertBody, setAlertBody] = useState(null);

  const homeUrl = process.env.REACT_APP_homeUrl;

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_baseURL, 
    timeout: 5000,
  });

  const [loginStatus, setLoginStatus] = useState(false);
  const changeLoginStatus = (result) => {
    setLoginStatus(result);
  };

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const setAlert = (msg) => {
    setAlertBody({ type: msg.type, msg: msg.message });
    setTimeout(() => {
      setAlertBody(null);
    }, 2000);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Navbar loginStatus={loginStatus} />
          <Alerts alertBody={alertBody} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <HomeBanner />
                  <NewDrips />
                </>
              }
            />
            <Route
              exact
              path="/product/luck-chance-world"
              element={
                <>
                  <OverSizedTshirtTemplate
                    loginStatus={loginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                    productId={"DRIP_1_3"}
                    homeUrl={homeUrl}
                  />
                </>
              }
            />
            <Route
              exact
              path="/product/authority-world"
              element={
                <>
                  <OverSizedTshirtTemplate
                    loginStatus={loginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                    productId={"DRIP_1_2"}
                    homeUrl={homeUrl}
                  />
                </>
              }
            />
            <Route
              exact
              path="/product/the-great-outdoors"
              element={
                <>
                  <OverSizedTshirtTemplate
                    loginStatus={loginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                    productId={"DRIP_1_1"}
                    homeUrl={homeUrl}
                  />
                </>
              }
            />
            <Route
              exact
              path="/product/david-sculpture"
              element={
                <>
                  <OverSizedTshirtTemplate
                    loginStatus={loginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                    productId={"DRIP_1_4"}
                    homeUrl={homeUrl}
                  />
                </>
              }
            />
            <Route
              exact
              path="/login"
              element={
                <>
                  <Middleware
                    loginStatus={changeLoginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                  />
                  <Paths path={["Customer Zone"]} />
                  <Login
                    forAlert={setAlert}
                    emailRegex={emailRegex}
                    passwordRegex={passwordRegex}
                    axiosInstance={axiosInstance}
                    loginStatus={changeLoginStatus}
                  />
                </>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <>
                  <Middleware
                    loginStatus={changeLoginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                  />
                  <Paths path={["Customer Zone"]} />
                  <Signup
                    forAlert={setAlert}
                    emailRegex={emailRegex}
                    passwordRegex={passwordRegex}
                    axiosInstance={axiosInstance}
                  />
                </>
              }
            />
            <Route
              exact
              path="/logout"
              element={
                <>
                  <Logout
                    forAlert={setAlert}
                    axiosInstance={axiosInstance}
                    loginStatus={changeLoginStatus}
                  />
                </>
              }
            />
            <Route
              exact
              path="/user/account"
              element={
                <>
                  <Middleware
                    loginStatus={changeLoginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                  />
                  <Paths path={["User", "Your Account"]} />
                  <div className="container">
                    <div className="row">
                      <NavTabs />
                      <AccDetail
                        forAlert={setAlert}
                        emailRegex={emailRegex}
                        axiosInstance={axiosInstance}
                      />
                    </div>
                  </div>
                </>
              }
            />
            <Route
              exact
              path="/user/account/changePassword"
              element={
                <>
                  <Middleware
                    loginStatus={changeLoginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                  />
                  <Paths path={["User", "Account", "Change Password"]} />
                  <div className="container">
                    <div className="row">
                      <NavTabs />
                      <ChangePassword
                        forAlert={setAlert}
                        passwordRegex={passwordRegex}
                        axiosInstance={axiosInstance}
                      />
                    </div>
                  </div>
                </>
              }
            />
            <Route
              exact
              path="/user/cart"
              element={
                <>
                  <Middleware
                    loginStatus={changeLoginStatus}
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                  />
                  <Paths path={["User", "Your Cart"]} />
                  <Cart
                    axiosInstance={axiosInstance}
                    forAlert={setAlert}
                    homeUrl={homeUrl}
                  />
                </>
              }
            />
            <Route
              exact
              path="*"
              element={
                <>
                  <h1 className="text-light">Not FOUND</h1>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  }).then(() => promise);
}

export default App;
