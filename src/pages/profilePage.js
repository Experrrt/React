import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import "../css/userProfile.css";

function ProfilePage(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelected = (e) => {
    console.log(e.target.files[0]);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    axios.post("http://localhost:5001/api/user/fromdata", data).then((res) => {
      props.checkLoginStatus();
    });
  };

  return (
    <div>
      {props.loogedInStatus === "NOT_LOGGED_IN" ? (
        <div>
          {props.history.push("/userpage")}
          <h1>Log in to see your profile</h1>
        </div>
      ) : (
        <div className="container-profile">
          <h4>{props.userLoading === "YES" ? "username" : props.user.name}</h4>

          <div className="img_cont">
            <label for="file-input">
              <img
                className="top1"
                src={
                  props.userLoading === "YES"
                    ? "./img/giphy.gif"
                    : `data:image/gif;base64,${props.user.img}`
                }
              />
              <p className="image_overlay">change</p>
            </label>
          </div>

          <input id="file-input" type="file" onChange={fileSelected} />
          {/* <input type="file" onChange={fileSelected} />
          <img
            className="top1"
            src={`data:image/gif;base64,${props.user.img}`}
          /> */}
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
