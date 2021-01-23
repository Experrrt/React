import React, { useEffect, useState, useRef } from "react";
import adress from "./apiAddress";
import axios from "axios";

async function Logout(props) {
  axios
    .delete(adress + "api/user/logout", {
      withCredentials: true,
    })
    .then((response) => {
      localStorage.clear();
      props();
    })
    .catch((err) => {
      console.log(err);
    });
}
export default Logout;
