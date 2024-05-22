import React from "react";
import { NavLink } from "react-router-dom";

export default function Path(props) {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <ol className="list-group list-group-horizontal justify-content-center text-light bg-transparent border-0">
            <li key="path1" className="list-group-item p-1 text-light bg-transparent border-0">
              <NavLink to={"/"} className="text-decoration-none text-light">
                Home
              </NavLink>
            </li>
            {props.path.map((item) => (
              <li key={`path_${item}`} className="list-group-item p-1 text-light bg-transparent border-0">
                / {item}{" "}
              </li>
            ))}
          </ol>
        </div>
        <div className="col-12 mt-3">
          <h2 className="d-flex text-light justify-content-center">
            {props.path[props.path.length - 1]}
          </h2>
        </div>
      </div>
    </div>
  );
}
