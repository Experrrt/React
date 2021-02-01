import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Registration from "./registrationPage";
import Login from "./loginpage";

function UserPage(props) {
  const succesfulAuth = (data) => {
    props.handleLogin(data);
    props.history.goBack();
  };

  return (
    <div>
      <div>
        <Registration successfulAuth={succesfulAuth} />
        <Login successfulAuth={succesfulAuth} />
      </div>
    </div>
  );
}

export default UserPage;
