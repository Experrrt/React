import React, { useEffect, useState, useRef } from "react";
import { socket } from "../scripts/socket";
import adress from "../scripts/apiAddress";
import axios from "axios";
import "../css/messages.css";
import MessageRendering from "../Components/MemoComps";
import {
  useTransition,
  animated,
  useChain,
  config,
  useSpring,
} from "react-spring";

function Messages(props) {
  const [message, setMessage] = useState("");
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [lastRoom, setLastRoom] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [usersInRooms, setUsersInRooms] = useState([]);
  const [newUsersInRooms, setNewUsersInRooms] = useState([]);
  const [canScroll, setCanScroll] = useState(false);
  const [click, setClick] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [roomMessagesLen, setRoomMessagesLen] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(20);
  const chatContainer = useRef(0);
  const timeoutRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (!canScroll) return;
    scrollToBot();
    setCanScroll(false);
  });

  useEffect(() => {
    let mouted = true;
    if (
      mouted &&
      props.loogedInStatus === "LOGGED_IN" &&
      props.userLoading === "NO"
    ) {
      loadRooms(props.user.rooms);
      socket.on("message", (message) => {
        setNewMessage(message);
        scrollToBot();
      });
      socket.on("allertMessage", (message) => {
        console.log(message.message);
        if (!message.joinedUsers) {
          return;
        }
        setUsersInRooms(message.joinedUsers);
      });
    }
    return () => (mouted = false);
  }, [props.userLoading]);

  useEffect(() => {
    if (!newMessage) return;
    setChatMessages([newMessage, ...chatMessages]);
    setCurrentIndex(currentIndex + 1);
    // setChatMessages([...chatMessages, newMessage]);
    setCanScroll(true);
  }, [newMessage]);

  useEffect(() => {
    if (!newUsersInRooms) return;
    setUsersInRooms([...usersInRooms, ...newUsersInRooms]);
  }, [newUsersInRooms]);

  const scrollToBot = () => {
    console.log(
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight
    );
    chatContainer.current.scrollTo(
      0,
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight
    );
  };

  const joinRoom = (roomID) => {
    if (!roomID || roomID == currentRoom) return;
    setChatMessages([]);
    setUsersInRooms([]);
    setCurrentIndex(20);

    socket.emit("joinRoom", {
      name: props.user.name,
      room: roomID,
      _id: props.user.id,
      img: props.user.img,
      last: currentRoom,
    });
    setCurrentRoom(roomID);
    // console.log(userRooms);
    // setCurrentRoom(
    //   userRooms.map((x) => {
    //     if (x.id == roomID) {
    //       return {
    //         name: x.name,
    //       };
    //     }
    //   })
    // );
    getMessages(roomID);
  };

  useEffect(() => {
    console.log(currentRoom);
  }, [currentRoom]);
  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chatMessage", message);
    setMessage("");
  };

  const createRoom = () => {
    axios
      .post(adress + "api/chatRooms/createRoom", { name: createRoomName })
      .then((response) => {
        if (response.data === "RC") {
          console.log("room created");
        }
      });
  };

  const loadRooms = (ids) => {
    axios
      .post(adress + "api/chatRooms/loadRooms", { id: ids })
      .then((response) => {
        setUserRooms(response.data);
        joinRoom(props.user.rooms[0]);
      });
  };

  const joinNewRoom = () => {
    axios
      .post(adress + "api/chatRooms/joinNewRoom", { roomID: joinRoomName })
      .then((response) => {
        if (response.data.message != "RJ") return;
        loadRooms([...props.user.rooms, response.data.id]);
      });
  };

  const getRoomUsers = (ids) => {
    axios
      .post(
        adress + "api/user/userFindMany",
        { id: ids },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message == "DE") return;
        setUsersInRooms(response.data);
      });
  };
  useEffect(() => {
    // if (roomMessagesLen + 10 < currentIndex) return;
    // loadMoreMessages(currentRoom, chatMessages);
  }, [currentIndex]);

  const loadTen = () => {
    if (roomMessagesLen + 20 < currentIndex) return;
    loadMoreMessages(currentRoom, chatMessages, currentIndex + 20);
    setCurrentIndex(currentIndex + 20);
  };

  const getMessages = (roomID) => {
    axios
      .post(adress + "api/chatRooms/getRoomContent", {
        id: roomID,
      })
      .then((response) => {
        console.log("getMessages");
        if (!response.data.messages) return;
        const reversed = response.data.messages.reverse();
        setChatMessages([...reversed]);
        console.log([...reversed]);
        setRoomMessagesLen(response.data.messagesLength);
        getRoomUsers(response.data.users);
      });
  };
  const loadMoreMessages = (roomID, chatMessages, index) => {
    axios
      .post(adress + "api/chatRooms/loadMoreMsgs", {
        id: roomID,
        index: index,
      })
      .then((response) => {
        console.log("loadMessages");
        if (!response.data.messages) return;
        const reversed = response.data.messages.reverse();
        setChatMessages([...chatMessages, ...reversed]);
        console.log([...chatMessages, ...reversed]);
      });
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false && /\S/.test(message)) {
      sendMessage(e);
    }
  };
  const CopiedPopup = () => {
    setShowPopup(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
      timeoutRef.current = null;
    }, 3000);
  };

  function setCanScrollM() {
    console.log("teraz");
    setCanScroll(true);
  }
  const animateSide = useSpring({
    right: click ? "-32%" : "0%",
  });
  const animBlur = useSpring({
    filter: click ? "blur(0px)" : "blur(10px)",
  });
  const animatePop = useSpring({
    transform: showPopup ? "scale(1)" : "scale(0.75)",
    visibility: showPopup ? "visible" : "hidden",
    config: { mass: 1, tension: 180, friction: 8 },
  });
  const [animateMessageDiv, setAnimateMessageDiv] = useSpring(() => ({
    transform: "translate(-101%, 0)",
  }));

  const getCurrent = () => {
    return userRooms.find((x) => x.id == currentRoom);
  };
  const checkIfTop = (e) => {
    if (
      e.target.clientHeight - e.target.scrollHeight ==
      Math.round(e.target.scrollTop - 1)
    ) {
      if (timeoutRef.current !== null) return;
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 1500);
      loadTen();
      console.log("top");
    }
    // console.log(e.target.clientHeight - e.target.scrollHeight);
    // console.log(e.target.scrollHeight);
    // console.log(Math.round(e.target.scrollTop - 1));
  };

  return (
    <div className="cont-main-msg">
      <input
        type="text"
        name="idd"
        placeholder=""
        value={joinRoomName}
        onChange={(e) => setJoinRoomName(e.target.value)}
      />
      {/* {() => joinNewRoom()} */}
      <button onClick={() => loadTen()}>JOIN ROOM</button>
      <input
        type="text"
        name="id"
        placeholder=""
        value={createRoomName}
        onChange={(e) => setCreateRoomName(e.target.value)}
      />
      <button onClick={() => createRoom()}>CREATEROOM</button>
      <div className="messages-container">
        {!userRooms.length == 0 && currentRoom ? (
          <div className="room-nav">
            <animated.div style={animBlur} className="room-nav-ni">
              <p className="room-nav-name">{getCurrent().name}</p>
              <div>
                <p
                  className="room-nav-id"
                  onClick={() => {
                    navigator.clipboard.writeText(currentRoom);
                    CopiedPopup();
                  }}
                >
                  id: {currentRoom}
                </p>
                <animated.span style={animatePop} className="cop-pop">
                  Copied!
                </animated.span>
              </div>
            </animated.div>
            <animated.div style={animBlur} className="nav-div"></animated.div>
            <animated.div style={animateSide} className="side-menu-users">
              <button
                style={{ position: "absolute", right: "100%" }}
                onClick={() => setClick(!click)}
                className="button-show-users"
              >
                Info
              </button>
              <div className="profile-stats-h">
                <div>
                  <span className="number-h">{roomMessagesLen}</span>
                  <span className="desc-h">messages</span>
                </div>
                <div>
                  <span className="number-h">{usersInRooms.length}</span>
                  <span className="desc-h">users</span>
                </div>
                <div>
                  <span className="number-h">108</span>
                  <span className="desc-h">letters</span>
                </div>
              </div>
              <div className="side-div"></div>
              <p className="all-users-desc">All users:</p>
              <ul className="list-all-users">
                {usersInRooms.map((user) => (
                  <li
                    className="list-element-all-users"
                    key={Math.floor(Math.random() * 1000000)}
                  >
                    <div
                      onClick={() =>
                        props.history.push("/profileFind/" + user.user.id)
                      }
                      className="all-users-user"
                    >
                      <div className="chat-img-cont">
                        <img
                          className="all-users-user-pic"
                          src={`data:image/gif;base64,${user.user.img}`}
                        />
                      </div>
                      <p>{user.user.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </animated.div>
          </div>
        ) : (
          <div></div>
        )}
        <animated.div style={animBlur} className="chat-rooms-cont">
          {userRooms.map((room) => (
            <li
              key={Math.floor(Math.random() * 1000000)}
              onClick={() => {
                joinRoom(room.id);
              }}
            >
              <a style={{ color: "#02899c" }}>{room.name}</a>
            </li>
          ))}
          <div className="chat-rooms-div"></div>
        </animated.div>
        <animated.ul
          style={animBlur}
          className="chat-container"
          ref={chatContainer}
          onScroll={(e) => checkIfTop(e)}
        >
          <MessageRendering
            chatMessages={chatMessages}
            usersInRooms={usersInRooms}
            user={props.user}
            // setCanScroll={setCanScrollM}
          ></MessageRendering>
        </animated.ul>
        <animated.form
          style={animBlur}
          onSubmit={(e) =>
            /\S/.test(message) ? sendMessage(e) : e.preventDefault()
          }
          className="chat-message-send-cont"
        >
          <textarea
            type="text"
            name="message"
            placeholder="Message"
            ref={textAreaRef}
            onFocus={() =>
              setAnimateMessageDiv({ transform: "translate(-25% , 0)" })
            }
            onBlur={() =>
              setAnimateMessageDiv({ transform: "translate(-101% , 0)" })
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => onEnterPress(e)}
          />
          <animated.button
            style={animateMessageDiv}
            type="submit"
            onClick={() => textAreaRef.current.focus()}
          >
            SEND
          </animated.button>
        </animated.form>
      </div>
    </div>
  );
}
export default Messages;
