import React from "react";
import { NavLink } from "react-router-dom";
// utils
import { useAppSelector as useSelector } from "../../store/hooks";
// styles
import "./NavBar.scss";

const NavBar = () => {
  const { auth } = useSelector((store) => store.auth);

  return (
    <header>
      <h1>Mern Auth</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        {!auth && <NavLink to="/signup">Sign Up</NavLink>}
        {!auth && <NavLink to="/login">Log In</NavLink>}
        {auth && <NavLink to="/logout">Log Out</NavLink>}
      </nav>
    </header>
  );
};

export default NavBar;
