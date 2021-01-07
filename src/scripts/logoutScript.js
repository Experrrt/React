import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

async function Logout(props){

    axios
    .delete("https://backend-app-jk.herokuapp.com/api/user/logout", {
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