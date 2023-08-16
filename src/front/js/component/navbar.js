import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/home"}>
          Hi, I'm Nav
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {!store.token ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/signin"}>
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>
                  Sign up
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  onClick={() => actions.logout()}
                  className="nav-link"
                  to={"#"}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};