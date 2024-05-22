import "./style.css";
import React from "react";
import { NavLink } from "react-router-dom";
import prod1 from "../../../assest/product/LuckChanceWorld/prod_img.png";
import prod2 from "../../../assest/product/DavidSculpture/prod_img.png";
import prod3 from "../../../assest/product/TheGreatDoor/prod_img.png";
import prod4 from "../../../assest/product/AuthorityWorld/prod_img.png";

export default function NewDrip() {
  return (
    <>
      <div className="container-fluid">
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-xl-8 mb-5">
              <h2 className="text-light">New Drips</h2>
              {/* <p className="lead text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p> */}
            </div>
          </div>
          <div className="row">
            {/* First Product */}
            <div className="col-md-4 mb-4 mb-md-5 pt-lg-3">
              <NavLink
                to={"/product/luck-chance-world"}
                className="d-flex justify-content-center"
              >
                <img className="img-fluid w-75 " src={prod1} alt="" />
              </NavLink>
              <div className="px-4 position-relative z-index-2 mt-n3">
                <NavLink
                  className="text-dark text-decoration-none"
                  to={"/product/luck-chance-world"}
                >
                  <h3 className="text-light">
                    Luck,
                    <br />
                    Chance,
                    <br />
                    World
                  </h3>
                </NavLink>
                <p>
                  {" "}
                  <NavLink
                    className="btn btn-link text-dark text-decoration-none px-0"
                    to={"/product/luck-chance-world"}
                  >
                    {" "}
                    <button className="cta">
                      <span className="hover-underline-animation">
                        {" "}
                        Shop now{" "}
                      </span>
                      <svg
                        viewBox="0 0 46 16"
                        height="10"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                        id="arrow-horizontal"
                        fill="#ffffff"
                      >
                        <path
                          transform="translate(30)"
                          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                          data-name="Path 10"
                          id="Path_10"
                        ></path>
                      </svg>
                    </button>
                  </NavLink>
                </p>
              </div>
            </div>
            {/* First Product End */}
            {/* Second Product */}
            <div className="col-md-7 ms-auto mb-4 mb-md-5">
              <div className="row bg-transparent">
                <div className="col-3 bg-transparent">
                  <div className="position-absolute z-index-5 py-5 bg-transparent">
                    <NavLink
                      className="text-light text-decoration-none bg-transparent"
                      to={"/product/david-sculpture"}
                    >
                      <h2 className="bg-transparent">
                        David
                        <br />
                        Sculpture
                      </h2>
                      <button className="cta bg-transparent">
                        <span className="hover-underline-animation bg-transparent">
                          {" "}
                          Shop now{" "}
                        </span>
                        <svg
                          viewBox="0 0 46 16"
                          height="10"
                          width="30"
                          xmlns="http://www.w3.org/2000/svg"
                          id="arrow-horizontal"
                          fill="#ffffff"
                          className="bg-transparent"
                        >
                          <path
                            transform="translate(30)"
                            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                            data-name="Path 10"
                            id="Path_10"
                          ></path>
                        </svg>
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div className="col-9">
                  <div className="ms-5">
                    <NavLink to={"/product/david-sculpture"} className="w-100">
                      <img
                        className="img-fluid w-75 overflow-hidden"
                        src={prod2}
                        alt=""
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Product End */}
            {/* Third Product */}
            <div className="col-md-7 mb-4 mb-md-5">
              <div className="row bg-transparent">
                <div className="col-3 bg-transparent">
                  <div className="position-absolute z-index-5 py-5 bg-transparent">
                    <NavLink
                      className="text-light text-decoration-none bg-transparent"
                      to={"/product/the-great-outdoors"}
                    >
                      <h2 className="bg-transparent">
                        The
                        <br />
                        Great
                        <br />
                        Outdoors
                      </h2>
                      <button className="cta bg-transparent">
                        <span className="hover-underline-animation bg-transparent">
                          {" "}
                          Shop now{" "}
                        </span>
                        <svg
                          viewBox="0 0 46 16"
                          height="10"
                          width="30"
                          xmlns="http://www.w3.org/2000/svg"
                          id="arrow-horizontal"
                          fill="#ffffff"
                          className="bg-transparent"
                        >
                          <path
                            transform="translate(30)"
                            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                            data-name="Path 10"
                            id="Path_10"
                          ></path>
                        </svg>
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div className="col-9">
                  <div className="ms-5">
                    <NavLink
                      to={"/product/the-great-outdoors"}
                      className="w-100"
                    >
                      <img
                        className="img-fluid w-75 overflow-hidden"
                        src={prod3}
                        alt=""
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            {/* Third Product End */}
            {/* Fourth Product */}
            <div className="col-md-4 mb-4 mb-md-5 pt-lg-3">
              <NavLink
                to={"/product/authority-world"}
                className="d-flex justify-content-center"
              >
                <img className="img-fluid w-75" src={prod4} alt="" />
              </NavLink>
              <div className="px-4 position-relative z-index-2 mt-n3">
                <NavLink
                  className="text-dark text-decoration-none"
                  to={"/product/authority-world"}
                >
                  <h3 className="text-light">
                    Authority
                    <br />
                    World
                  </h3>
                </NavLink>
                <p>
                  {" "}
                  <NavLink
                    className="btn btn-link text-dark text-decoration-none px-0"
                    to={"/product/authority-world"}
                  >
                    {" "}
                    <button className="cta">
                      <span className="hover-underline-animation">
                        {" "}
                        Shop now{" "}
                      </span>
                      <svg
                        viewBox="0 0 46 16"
                        height="10"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                        id="arrow-horizontal"
                        fill="#ffffff"
                      >
                        <path
                          transform="translate(30)"
                          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                          data-name="Path 10"
                          id="Path_10"
                        ></path>
                      </svg>
                    </button>
                  </NavLink>
                </p>
              </div>
            </div>
            {/* Fourth Product End */}
          </div>
        </div>
      </div>
    </>
  );
}
