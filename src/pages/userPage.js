import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/userPage.css";
import Registration from "./registrationPage";
import Login from "./loginpage";
import {
  useTransition,
  animated,
  useChain,
  config,
  useSpring,
} from "react-spring";
import Logo from "../svg/svg-logo";
import BtnIcon from "../svg/btn-svg";

function UserPage(props) {
  const [ghostBtn, setGhostBtn] = useState(false);

  const succesfulAuth = (data) => {
    props.handleLogin(data);
    props.history.goBack();
  };

  const [animDivSwitch, setDivSwitch] = useSpring(() => ({
    marginLeft: "0px",
  }));

  return (
    <div className="userpage-main-cont">
      <div className="userpage-sub-cont">
        <Logo></Logo>
        <div className="reg-buttons">
          <button
            id="first"
            className={!ghostBtn ? "primary" : "ghost"}
            onClick={() => {
              setDivSwitch({ marginLeft: "0px" });
              setGhostBtn(false);
            }}
          >
            <text>Register</text>
          </button>
          <BtnIcon classa={"btn-icon-reg"}></BtnIcon>
          <button
            id="last"
            className={ghostBtn ? "primary" : "ghost"}
            onClick={() => {
              setDivSwitch({ marginLeft: "-400px" });
              setGhostBtn(true);
            }}
          >
            <text>Login</text>
          </button>
        </div>
        <div className="reglog-main-cont">
          <animated.div style={animDivSwitch} className="register-main-cont">
            <Registration successfulAuth={succesfulAuth} />
          </animated.div>
          <div className="login-main-cont">
            <Login successfulAuth={succesfulAuth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
