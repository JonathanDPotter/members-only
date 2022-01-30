import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icons
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";
// styles
import "./LogOut.scss";
import api from "../../api";

const LogOut = () => {
  const logOut = () => api.logOut();

  return (
    <div className="log-out">
      <h1>Log Out</h1>
      <button onClick={logOut}>
        <FontAwesomeIcon icon={faLongArrowAltDown} />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default LogOut;
