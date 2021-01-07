import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import "../css/navbar.css";
import Icon from "../svg/svg.js";
import { Link } from "react-router-dom";
import Logout from "../scripts/logoutScript";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    console.log(click);
  };

  const handleLogout = ()=>{
    //props.history.push("/")
    Logout(props.handleLogout);
  }

  window.addEventListener("resize", () => {
    setClick(false);
  });

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <Icon />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            About
          </Link>
        </li>
        {props.loggedIn == "NOT_LOGGED_IN" ? (
        <li>
          <Link to="/" className="link">
            Work
          </Link>
        </li>
          ) : (
            <li>
            <Link to="/profile" className="link" >
              Profile
            </Link>
          </li>
            )}
        {props.loggedIn == "NOT_LOGGED_IN" ? (
          <li>
            <Link to="/userpage" className="link">
              Register
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/" className="link" onClick={handleLogout}>
              Logout
            </Link>
          </li>     
        )}
      </ul>
      <div className="burger" onClick={handleClick}>
        <ul className={click ? "open" : "close"}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
