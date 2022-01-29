import React from "react";
import { NavLink } from "react-router-dom";
// utils
import { useAppSelector as useSelector } from "../../store/hooks";
// styles
import "./NavBar.scss";

const NavBar = () => {
  const { auth } = useSelector((store) => store.auth);

  const GuestLinks = () => {
    return (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </>
    );
  };

  const AuthLinks = () => {
    return (
      <>
        <NavLink to="/create-message">Create Message</NavLink>
        <NavLink to="/join">Join</NavLink>
        <NavLink to="/logout">Log Out</NavLink>
      </>
    );
  };

  return (
    <header>
      <h1>Members Only</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        {auth ? <AuthLinks /> : <GuestLinks />}
      </nav>
      {auth && <img src={auth.image} alt="userAvatar" />}
    </header>
  );
};

export default NavBar;
