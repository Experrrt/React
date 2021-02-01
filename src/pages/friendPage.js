import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import adress from "../scripts/apiAddress";
import "../css/friendsPage.css";
import { easeCubicIn } from "d3-ease";
import {
  useTransition,
  animated,
  useChain,
  config,
  useSpring,
} from "react-spring";

function FriendPage(props) {
  const [ID, setID] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendsRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [tog, setTog] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (props.loogedInStatus !== "LOGGED_IN" && props.userLoading === "NO") {
      props.history.push("/userpage");
    }
  });

  useEffect(() => {
    let mouted = true;
    if (
      mouted &&
      props.loogedInStatus === "LOGGED_IN" &&
      props.userLoading === "NO"
    ) {
      getFriends();
      getFriendRequests();
    }
    return () => (mouted = false);
  }, [props.userLoading]);

  const timeOutMessage = (message) => {
    setMessage(message);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessage("");
      timeoutRef.current = null;
    }, 5000);
  };
  const add = () => {
    setTog(!tog);
    // setFriends([
    //   ...friends,
    //   { user: { name: "adada", id: Math.floor(Math.random() * 1000), img: "asdasdad" } },
    // ]);
    // setFriends(friends.slice(1));
    // setFriends(friends.slice(1));
    // setFriendsRequests([
    //   ...friends,
    //   { user: { name: "adada", id: "adada", img: "asdasdad" } },
    // ]);
  };

  const sendFriendRequest = () => {
    if (waiting) return;
    setMessage("sending");
    setWaiting(true);
    axios
      .post(
        adress + "api/user/sendFriendRequest",
        { friend: ID },
        { withCredentials: true }
      )
      .then((response) => {
        setWaiting(false);
        switch (response.data.message) {
          case "DE":
            timeOutMessage("Could not find user");
            break;
          case "AF":
            timeOutMessage("You are alredy friends with this user");
            break;
          case "AS":
            timeOutMessage("You have alredy send friend request to this user");
            break;
          case "SUCC":
            timeOutMessage("Request send succesfuly");
            break;
        }
      });
  };

  const acceptFriendRequests = (ID) => {
    if (waiting) return;
    setWaiting(true);
    axios
      .post(
        adress + "api/user/acceptFriendRequst",
        {
          friend: ID,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.message === "DE") {
          console.log("neni");
        } else {
          axios
            .post(
              adress + "api/user/userFind",
              { id: ID },
              { withCredentials: true }
            )
            .then((response) => {
              if (response === "DE") {
                return;
              }
              const newList = friendRequests.filter(
                (item) => item.user.id !== ID
              );
              setFriendsRequests(newList);
              setFriends([...friends, response.data]);
            });
        }
        setWaiting(false);
      });
  };

  const getFriends = () => {
    axios
      .post(
        adress + "api/user/userFindMany",
        { id: props.user.friends },
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.message == "DE") return;
        setFriends(response.data);
      });
  };

  const getFriendRequests = () => {
    axios
      .post(
        adress + "api/user/userFindMany",
        { id: props.user.friendRequests },
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.message == "DE") return;
        setFriendsRequests(response.data);
      });
  };
  const transition = useTransition(friends, (item) => item.user.id, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    // from: { marginTop: -100 },
    // enter: { marginTop: 0 },
    // leave: { marginTop: -100 },
    // config: { tension: 210, friction: 20 },
    config: config.wobbly,
    trail: 400 / friends.length,
  });
  const transition2 = useTransition(friendRequests, (item) => item.user.id, {
    // config: { tension: 210, friction: 20 },
    // from: { marginTop: -100 },
    // enter: { marginTop: 0 },
    // leave: { opacity: 0 },
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: config.wobbly,
    trail: 400 / friendRequests.length,
  });
  const spring = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 1200, easing: (t) => easeCubicIn(t) },
  });
  return (
    <div className="contt">
      <div className="const-send">
        <input
          type="text"
          name="email"
          placeholder="Friends ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <button className="butonn" type="submit" onClick={add}>
          SEND
        </button>
        <h6>{message}</h6>
      </div>
      <div className="devider"></div>
      {friends.length == 0 ? (
        <div className="container-main-friends">
          <div className="container-sub-friends">
            {props.loogedInStatus === "LOGGED_IN" &&
            props.userLoading === "NO" ? (
              <p className="profile-name">No friends</p>
            ) : (
              <div className="img_cont">
                <img className="top1" src="/img/giphy.gif" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container-main-friends">
          {transition.map(({ item, props, key }) => (
            <animated.li className="cont-element" key={key} style={props}>
              <div className="container-sub-friends">
                <div className="img_cont">
                  <img
                    className="top1"
                    src={
                      loading
                        ? "/img/giphy.gif"
                        : `data:image/gif;base64,${item.user.img}`
                    }
                  />
                </div>
                <animated.p style={spring} className="profile-name">
                  {item.user.name}
                </animated.p>
              </div>
            </animated.li>
          ))}
        </div>
      )}
      <div className="devider"></div>
      {friendRequests.length == 0 ? (
        <div className="container-main-friendRequests">
          <div className="container-sub-friendRequests">
            {props.loogedInStatus === "LOGGED_IN" &&
            props.userLoading === "NO" ? (
              <p className="profile-name">No friend request</p>
            ) : (
              <div className="img_cont">
                <img className="top1" src="/img/giphy.gif" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container-main-friendRequests">
          {transition2.map(({ item, props, key }) => (
            <animated.li className="cont-element" key={key} style={props}>
              <div className="container-sub-friendRequests">
                <div className="img_cont">
                  <img
                    className="top1"
                    src={
                      loading
                        ? "/img/giphy.gif"
                        : `data:image/gif;base64,${item.user.img}`
                    }
                  />
                </div>
                <p className="profile-name">{item.user.name}</p>
                <button onClick={() => acceptFriendRequests(item.user.id)}>
                  ACCEPT
                </button>
              </div>
            </animated.li>
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendPage;
