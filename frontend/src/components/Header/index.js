import React from "react";
import "./style.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

function Header({ children, linkLogo = "/" }) {
  return (
    <>
      <header className="menu">
        <Link to={linkLogo}>
          <img src={logo} alt="Logo da empresa Lapiseira"></img>
        </Link>
        {children}
      </header>
    </>
  );
}

export default Header;
