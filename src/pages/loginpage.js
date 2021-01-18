import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

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
        "http://localhost:5001/api/user/login",
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

  return (
    <div>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
      {loading ? <h6>Loading</h6> : <h6></h6>}
      <h6>{message}</h6>
    </div>
  );
}

export default LoginPage;
