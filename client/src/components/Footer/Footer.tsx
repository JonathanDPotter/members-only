import React from "react";
import { NavLink } from "react-router-dom";
// styles
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <a
          href="https://github.com/JonathanDPotter/members-only"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
