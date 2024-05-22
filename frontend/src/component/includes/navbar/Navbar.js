import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logoWhite.svg";

export default function Navbar(props) {
  const [isTargetVisible, setIsTargetVisible] = useState(false);

  const toggleTarget = () => {
    setIsTargetVisible(!isTargetVisible);
  };

  return (
    <>
      <div className="container-fluid text-light">
        <div className="row">
          <div className="col-12 p-2 border-bottom text-center bg-transparent">
            Free Delivery Available &nbsp;|&nbsp; 30% OFF on Pre-Order
          </div>
        </div>
      </div>
      <div className="nav navbar navbar-dark bg-transparent pt-3">
        <div className="container-fluid bg-transparent">
          <button
            className="border-0 bg-transparent"
            type="button"
            data-bs-toggle="offcanvas" // Replace with your desired toggle action
            data-bs-target="#myTarget" // Replace with the ID of your target element
            onClick={toggleTarget}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0,0,256,256"
              className="bg-transparent"
            >
              <g transform="">
                <g
                  fill="#ffffff"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.33333,5.33333)">
                    <path d="M6,9c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h36c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM6,22c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h36c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM6,35c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h36c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>

          <NavLink className="navbar-brand bg-transparent" to={"/"}>
            <img
              src={logo}
              className="bg-transparent"
              alt="Dripster"
              style={{ width: "150px", height: "auto" }}
            />
          </NavLink>
          {(props.loginStatus && (
            <>
              <NavLink
                to={"/user/cart"}
                className="text-decoration-none text-light bg-transparent m-0 p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-cart bg-transparent m-0 p-0"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </NavLink>
            </>
          )) || (
            <NavLink
              to={"/login"}
              className="text-decoration-none text-light bg-transparent"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
      <div
        className={`offcanvas offcanvas-start ${isTargetVisible ? "show" : ""}`}
        tabIndex="-1"
        id="myTarget"
        aria-labelledby="targetLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close btn-close-white text-reset mt-5 position-absolute top-0 end-0 me-3"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={toggleTarget}
          ></button>
        </div>
        <div className="offcanvas-body text-light">
          <ul className="list-group bg-transparent border-0 text-light mt-5">
            <li
              key="navbar1"
              className="list-group-item bg-transparent border-0 text-light"
            >
              {" "}
              <NavLink
                to={"/"}
                className="text-light text-decoration-none"
                onClick={toggleTarget}
              >
                <h3>Home</h3>
              </NavLink>
            </li>
            {props.loginStatus && (
              <>
                {" "}
                <li
                  key="navbar2"
                  className="list-group-item bg-transparent border-0 text-light"
                >
                  <NavLink
                    to={"/user/account"}
                    className="text-light text-decoration-none"
                    onClick={toggleTarget}
                  >
                    <h3>My Account</h3>
                  </NavLink>
                </li>
                <li
                  key="navbar3"
                  className="list-group-item bg-transparent border-0 text-light"
                >
                  <NavLink
                    to={"/logout"}
                    className="text-light text-decoration-none"
                    onClick={toggleTarget}
                  >
                    <h3>Logout</h3>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
