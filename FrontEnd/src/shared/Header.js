import React from "react";
import Logo from "../imgs/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} />
      <span className="rule">사용법 바로가기</span>
    </div>
  );
};

export default Header;
