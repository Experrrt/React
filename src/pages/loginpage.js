import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import adress from "../scripts/apiAddress";
import "../css/login.css";
import BtnIcon from "../svg/btn-svg";
import {
  useTransition,
  animated,
  useChain,
  config,
  useSpring,
} from "react-spring";

function LoginPage(props) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (message === "") return;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setMessage("");
      timeoutRef.current = null;
    }, 5000);
  }, [message]);

  const handleSubmit = (e) => {
    if (loading) return;
    sendemail();
    e.preventDefault();
  };

  function sendemail() {
    setLoading(true);
    setMessage("");

    axios
      .post(
        adress + "api/user/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message === "loggedin") {
          localStorage.setItem("token", response.data.token);
          props.successfulAuth(response.data.user);
        } else {
          setLoading(false);
          setMessage(response.data.message);
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  }
  const [animFormUn1, setAnimFormUn1] = useSpring(() => ({
    top: "0px",
    fontSize: "16px",
  }));
  const [animFormUn2, setAnimFormUn2] = useSpring(() => ({
    top: "0px",
    fontSize: "16px",
  }));
  return (
    <div className="login-sub">
      <div className="user-box">
        <input
          id="email"
          className="user-box-input"
          autoComplete="off"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={() => setAnimFormUn1({ top: "-20px", fontSize: "12px" })}
          onBlur={() => {
            if (email.length === 0)
              setAnimFormUn1({ top: "0px", fontSize: "16px" });
          }}
        />
        <animated.label style={animFormUn1} className="label">
          Username
        </animated.label>
        <div className="user-box-underline-off">
          <div className="user-box-underline" />
        </div>
      </div>
      <div className="user-box">
        <input
          className="user-box-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          required
          onFocus={() => setAnimFormUn2({ top: "-20px", fontSize: "12px" })}
          onBlur={() => {
            if (password.length === 0)
              setAnimFormUn2({ top: "0px", fontSize: "16px" });
          }}
        />
        <animated.label style={animFormUn2} className="label">
          Password
        </animated.label>
        <div className="user-box-underline-off">
          <div className="user-box-underline" />
        </div>
      </div>
      <button
        className="login-button-submit"
        type="submit"
        onClick={handleSubmit}
      >
        <BtnIcon classa={"btn-icon"}></BtnIcon>
        <div className="btn-bckground"> Login</div>
        <BtnIcon classa={"btn-icon-down"}></BtnIcon>
      </button>
      {loading ? <h6>Loading</h6> : <h6></h6>}
      <h6>{message}</h6>
    </div>
  );
}

export default LoginPage;
