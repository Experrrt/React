import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Redirect, useParams } from "react-router-dom";
import adress from "../scripts/apiAddress";
import "../css/profileFinder.css";

function ProfileViewer(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(adress + "api/user/userFind", {
        id: id,
      })
      .then((response) => {
        setLoading(false);
        if (response.data === "DE") return;
        setUser({
          name: response.data.user.name,
          img: response.data.user.img,
        });
      });
  }, []);

  return (
    <div>
      {/* {props.loogedInStatus === "NOT_LOGGED_IN" ? (
        <div>
          {props.history.push("/userpage")}
          <h1>Log in to see your profile</h1>
        </div>
      ) : ( */}
      <div className="container-profile">
        <h4 className={loading ? "profile-name-blur" : "profile-name"}>
          {loading ? "username" : user.name}
        </h4>

        <div className="img_cont">
          <img
            className="top1"
            src={
              loading ? "/img/giphy.gif" : `data:image/jpg;base64,${user.img}`
            }
          />
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
export default ProfileViewer;
