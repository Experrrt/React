import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import adress from "../scripts/apiAddress";
import "../css/userProfile.css";

function ProfilePage(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (props.loogedInStatus !== "LOGGED_IN" && props.userLoading === "NO") {
      props.history.push("/userpage");
    }
  });

  const fileSelected = (e) => {
    console.log(e.target.files[0]);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    axios.post(adress + "api/user/fromdata", data).then(() => {
      props.checkLoginStatus();
    });
  };

  return (
    <div>
      <div className="container-profile">
        <h4>{props.userLoading === "YES" ? "username" : props.user.name}</h4>

        <div className="img_cont">
          <label htmlFor="file-input">
            <img
              className="top1"
              src={
                props.userLoading === "YES"
                  ? "/img/giphy.gif"
                  : `data:image/gif;base64,${props.user.img}`
              }
            />
            <p className="image_overlay">change</p>
          </label>
        </div>

        <input id="file-input" type="file" onChange={fileSelected} />
      </div>
    </div>
  );
}
export default ProfilePage;
