import React from "react";
import { NavLink } from "react-router-dom";

export default function NavTab() {
  const navLinks = [
    { to: "/user/account", text: "View Account" },
    { to: "/user/account/changePassword", text: "Change Password" },
    { to: "/user/order", text: "View Order" },
    { to: "/logout", text: "Logout" },
  ];

  return (
    <div className="col-12 col-md-3 mt-3 order-md-last text-light">
      <ul className="list-group bg-transparent w-100">
        <li className="list-group-item bg-transparent text-light border-0 text-center p-3 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </li>
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`list-group-item bg-dark text-light border-0 p-3 ${
              index === 0 ? "rounded-top" : index === navLinks.length - 1 ? "rounded-bottom" : ""
            }`}
          >
            <NavLink
              to={link.to}
              className="text-light text-decoration-none bg-transparent"
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}