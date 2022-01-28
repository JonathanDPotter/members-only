import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icons
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";
// styles
import "./LogOut.scss";

const LogOut = () => {
  const logOut = () =>
    window.open("http://localhost:1337/api/auth/logout", "_self");

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
